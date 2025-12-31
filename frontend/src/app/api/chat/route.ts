import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { trace, context, propagation, SpanKind, SpanStatusCode } from '@opentelemetry/api';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

const MCP_SERVER_URLS = [
  process.env.NEXT_PUBLIC_EVENT_MCP_SERVER_URL || 'http://localhost:8082/mcp',
  process.env.NEXT_PUBLIC_BOOKING_MCP_SERVER_URL || 'http://localhost:8083/mcp'
].filter(Boolean);

const SYSTEM_PROMPT_BASE = `You are Pulsar AI, a friendly and helpful event assistant for the Pulsar planetarium and cosmic event platform.

Your role is to help users with:
- Finding and recommending events (planetarium shows, space exhibitions, stargazing nights, etc.)
- Answering questions about event details, schedules, and venues
- Helping with booking information and ticket availability
- Providing information about astronomy and space-related topics
- General customer support for the platform

IMPORTANT: You have access to real-time tools that fetch actual data from our system. You MUST use these tools when users ask about:
- Events (use getAllEvents to list all events, or getEventById for specific events by ID)
- Searching for events by name (use searchEventByTitle - this handles typos and partial matches!)
- Bookings (use the appropriate booking tools)
- Any other real data from our database

CRITICAL - SEARCHING FOR EVENTS BY NAME:
When a user mentions an event by name (e.g., "book Mars: The Next Frontier" or "tell me about the aurora show"):
1. ALWAYS use searchEventByTitle first to find the event
2. The tool returns a bestMatch with a similarityScore (0-1):
   - Score >= 0.7: High confidence match, proceed with the action
   - Score 0.5-0.7: Likely match, but confirm with the user
   - Score < 0.5: Low confidence, show alternatives and ask user to clarify
3. Use the event ID from the bestMatch for booking or other operations

NEVER make up or fabricate event, booking, or user data. ALWAYS call the appropriate tool first to get real information.

If a user asks:
- "list all events" → ALWAYS call getAllEvents
- "book [event name]" or "details about [event name]" → call searchEventByTitle first, then use the returned event ID
- "details for event ID X" → call getEventById
- "my bookings" → call the booking tools

IMPORTANT RULE ABOUT MISSING DATA:
If a tool returns no data, missing data, an error, or an empty result (e.g., event not found, booking not found), you MUST NOT guess or invent information. 
Instead, respond in a friendly cosmic-themed way indicating uncertainty, such as:
- "Hmm, I'm not seeing that in our star map."
- "I couldn't find any event matching that."
- "I'm not sure about that one — it might not exist in our system."

Final responsibility:
After receiving real tool data, always format the information clearly and present it in a warm, enthusiastic, cosmic-themed tone.
Keep responses concise, helpful, and friendly.`;

function buildSystemPrompt(user: { userId: string; username: string; email: string } | null): string {
  if (!user) {
    return SYSTEM_PROMPT_BASE + `

CURRENT USER STATUS: Not logged in.
When the user tries to book an event or access their bookings, politely inform them they need to log in first.
Do NOT attempt to call createBooking or access user-specific booking data.`;
  }

  return SYSTEM_PROMPT_BASE + `

CURRENT USER CONTEXT:
- User ID: ${user.userId}
- Username: ${user.username}
- Email: ${user.email}

When creating bookings, use the User ID above (${user.userId}) as the userId parameter.
When the user asks about "my bookings", you can fetch their bookings using their User ID.
Address the user by their name (${user.username}) when appropriate to make the interaction more personal.`;
}

function convertToGeminiType(jsonType: string): SchemaType {
  const typeMap: Record<string, SchemaType> = {
    'string': SchemaType.STRING,
    'number': SchemaType.NUMBER,
    'integer': SchemaType.INTEGER,
    'boolean': SchemaType.BOOLEAN,
    'array': SchemaType.ARRAY,
    'object': SchemaType.OBJECT,
  };
  return typeMap[jsonType] || SchemaType.STRING;
}

function convertSchema(schema: any): any {
  if (!schema) {
    return { type: SchemaType.OBJECT, properties: {} };
  }
  
  const result: Record<string, unknown> = {
    type: convertToGeminiType(schema.type || 'object'),
    properties: {},
  };
  
  if (schema.description) result.description = schema.description;
  if (schema.properties) {
    result.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]: [string, any]) => [
        key,
        convertSchema(value),
      ])
    );
  }
  if (schema.required) result.required = schema.required;
  if (schema.items) result.items = convertSchema(schema.items);
  
  return result;
}

async function getMcpClients() {
  const tracer = trace.getTracer('frontend');
  
  const clients = await Promise.all(
    MCP_SERVER_URLS.map(async (url, index) => {
      return tracer.startActiveSpan(`mcp.connect.${new URL(url).hostname}`, { kind: SpanKind.CLIENT }, async (span) => {
        try {
          span.setAttribute('mcp.server.url', url);
          
          const client = new Client({
            name: `pulsar-chat-client-${index}`,
            version: '1.0.0',
          });
          
          const headers: Record<string, string> = {};
          propagation.inject(context.active(), headers);
          
          const transport = new StreamableHTTPClientTransport(new URL(url), {
            requestInit: {
              headers: headers,
            },
          });
          
          await client.connect(transport);
          span.setStatus({ code: SpanStatusCode.OK });
          return { client, url };
        } catch (error) {
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          console.warn(`Failed to connect to MCP server at ${url}:`, error);
          return null;
        } finally {
          span.end();
        }
      });
    })
  );
  return clients.filter((c): c is { client: Client; url: string } => c !== null);
}

export async function POST(request: NextRequest) {
  const tracer = trace.getTracer('frontend');
  
  return tracer.startActiveSpan('chat.request', { kind: SpanKind.SERVER }, async (rootSpan) => {
    let mcpClients: { client: Client; url: string }[] = [];
    
    try {
      const { message, history, user } = await request.json();
      rootSpan.setAttribute('user.id', user?.userId || 'anonymous');
      rootSpan.setAttribute('message.length', message?.length || 0);
      
      console.log('[Chat API] Received message:', { 
      messageLength: message?.length, 
      historyLength: history?.length,
      userId: user?.userId || 'not logged in'
    });

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error('[Chat API] Gemini API key not configured');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    let tools: { name: string; description: string; parameters: any; serverUrl: string }[] = [];
    try {
      console.log('[Chat API] Connecting to MCP servers:', MCP_SERVER_URLS);
      mcpClients = await getMcpClients();
      console.log('[Chat API] Connected to MCP servers:', mcpClients.length);
      
      const allTools = await Promise.all(
        mcpClients.map(async ({ client, url }) => {
          try {
            const toolsResponse = await client.listTools();
            console.log(`[Chat API] Tools from ${url}:`, toolsResponse.tools.map(t => t.name));
            return toolsResponse.tools.map(tool => ({
              ...tool,
              serverUrl: url, 
            }));
          } catch (error) {
            console.warn(`[Chat API] Failed to list tools from ${url}:`, error);
            return [];
          }
        })
      );

      tools = allTools.flat().map((tool) => ({
        name: tool.name,
        description: tool.description || '',
        parameters: convertSchema(tool.inputSchema),
        serverUrl: tool.serverUrl,
      }));
        
      console.log('[Chat API] MCP Tools available:', tools.map(t => t.name));
    } catch (mcpError) {
      console.warn('[Chat API] MCP connection failed, continuing without tools:', mcpError);
    }

    const modelConfig: any = { model: 'gemini-2.5-flash' };
    if (tools.length > 0) {
      modelConfig.tools = [{
        functionDeclarations: tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        })),
      }];
    }

    const model = genAI.getGenerativeModel(modelConfig);
    console.log('[Chat API] Initialized Gemini model with tools:', tools.length > 0 ? 'enabled' : 'disabled');

    const chatHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })) || [];

    const systemPrompt = buildSystemPrompt(user);

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: user 
            ? `Understood! I am Pulsar AI, your cosmic event assistant. Welcome back, ${user.username}! I'm here to help you discover amazing planetarium shows, space exhibitions, and stargazing events. How can I assist you today?`
            : 'Understood! I am Pulsar AI, your cosmic event assistant. I\'m here to help you discover amazing planetarium shows, space exhibitions, and stargazing events. How can I assist you today?' 
          }],
        },
        ...chatHistory,
      ],
    });

    console.log('[Chat API] Sending message to Gemini');
    let result = await chat.sendMessage(message);
    let response = result.response;

    while (response.candidates?.[0]?.content?.parts?.some(part => 'functionCall' in part)) {
      const functionCalls = response.candidates[0].content.parts.filter(
        (part): part is { functionCall: { name: string; args: Record<string, unknown> } } => 'functionCall' in part
      );
      
      console.log('[Chat API] Processing function calls:', functionCalls.map(fc => fc.functionCall.name));
      const toolResults: { functionResponse: { name: string; response: Record<string, unknown> } }[] = [];
      
      for (const part of functionCalls) {
        const { name, args } = part.functionCall;
        console.log(`[Chat API] Calling MCP tool: ${name}`, args);
        
        await tracer.startActiveSpan(`mcp.tool.${name}`, { kind: SpanKind.CLIENT }, async (toolSpan) => {
          toolSpan.setAttribute('mcp.tool.name', name);
          toolSpan.setAttribute('mcp.tool.args', JSON.stringify(args));
          
          try {
            const toolInfo = tools.find(t => t.name === name);
            const clientInfo = mcpClients.find(c => c.url === toolInfo?.serverUrl);
            
            if (!clientInfo) {
              console.error(`[Chat API] No client found for tool ${name}`);
              toolSpan.setStatus({ code: SpanStatusCode.ERROR, message: 'No client found' });
              toolResults.push({
                functionResponse: {
                  name,
                  response: { error: 'MCP server not available for this tool' },
                },
              });
              return;
            }
            
            toolSpan.setAttribute('mcp.server.url', clientInfo.url);
            
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Tool call timeout after 10 seconds')), 10000)
            );
            
            const toolCallPromise = clientInfo.client.callTool({ name, arguments: args });
            
            const toolResult = await Promise.race([toolCallPromise, timeoutPromise]) as any;
            console.log(`[Chat API] Tool ${name} result:`, JSON.stringify(toolResult, null, 2));
            
            toolSpan.setStatus({ code: SpanStatusCode.OK });
            toolResults.push({
              functionResponse: {
                name,
                response: { result: toolResult.content },
              },
            });
          } catch (toolError) {
            console.error(`[Chat API] Tool ${name} error:`, toolError);
            toolSpan.setStatus({ code: SpanStatusCode.ERROR, message: String(toolError) });
            toolResults.push({
              functionResponse: {
                name,
                response: { error: `Tool execution failed: ${toolError instanceof Error ? toolError.message : String(toolError)}` },
              },
            });
          } finally {
            toolSpan.end();
          }
        });
      }

      console.log('[Chat API] Sending tool results back to Gemini');
      result = await chat.sendMessage(toolResults);
      response = result.response;
    }

    const text = response.text();
    console.log('[Chat API] Generated response, length:', text.length);
    rootSpan.setStatus({ code: SpanStatusCode.OK });
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('[Chat API] Error:', error);
    rootSpan.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  } finally {
    console.log('[Chat API] Closing MCP clients');
    await Promise.all(
      mcpClients.map(({ client }) => 
        client.close().catch(() => {})
      )
    );
    rootSpan.end();
  }
  });
}