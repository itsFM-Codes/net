'use client';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { LoggerProvider, BatchLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { trace, context, propagation } from '@opentelemetry/api';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import type { AnyValueMap } from '@opentelemetry/api-logs';

let initialized = false;
let loggerProvider: LoggerProvider | null = null;

export function initializeOtel() {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  const otelCollectorUrl = process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL || 'http://localhost:4318';

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'frontend',
    [ATTR_SERVICE_VERSION]: '0.1.0',
  });

  const traceExporter = new OTLPTraceExporter({
    url: `${otelCollectorUrl}/v1/traces`,
  });

  const tracerProvider = new WebTracerProvider({
    resource,
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
  });

  tracerProvider.register({
    contextManager: new ZoneContextManager(),
  });

  const logExporter = new OTLPLogExporter({
    url: `${otelCollectorUrl}/v1/logs`,
  });

  const logProcessors = [new BatchLogRecordProcessor(logExporter)];
  
  if (process.env.NODE_ENV === 'development') {
    logProcessors.push(new BatchLogRecordProcessor(new ConsoleLogRecordExporter()));
  }

  loggerProvider = new LoggerProvider({
    resource,
    processors: logProcessors,
  });

  logs.setGlobalLoggerProvider(loggerProvider);

  propagation.setGlobalPropagator(new W3CTraceContextPropagator());

  const propagateTraceHeaderCorsUrls = [
    /localhost/,
    /127\.0\.0\.1/,
    /user-service/,
    /auth-service/,
    /event-service/,
    /booking-service/,
  ];

  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls,
      }),
    ],
  });

  initialized = true;
  console.log('OpenTelemetry initialized for frontend');
}

export function getLogger(name: string = 'frontend') {
  const provider = logs.getLoggerProvider();
  return provider.getLogger(name);
}

function formatMessage(message: string, attributes?: AnyValueMap): string {
  if (!attributes) return message;
  
  let formattedMessage = message;
  const values = Object.values(attributes);
  let valueIndex = 0;
  
  formattedMessage = formattedMessage.replace(/\{\}/g, () => {
    if (valueIndex < values.length) {
      const value = values[valueIndex++];
      return String(value);
    }
    return '{}';
  });
  
  return formattedMessage;
}

export const otelLog = {
  debug: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.DEBUG,
      severityText: 'DEBUG',
      body: formatMessage(message, attributes),
      attributes,
    });
  },
  
  info: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
      body: formatMessage(message, attributes),
      attributes,
    });
  },
  
  warn: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.WARN,
      severityText: 'WARN',
      body: formatMessage(message, attributes),
      attributes,
    });
  },
  
  error: (message: string, attributes?: AnyValueMap) => {
    const logger = getLogger();
    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: formatMessage(message, attributes),
      attributes,
    });
  },
};

export function getTracer(name: string = 'frontend') {
  return trace.getTracer(name);
}

export function injectTraceContext(headers: Record<string, string> = {}): Record<string, string> {
  propagation.inject(context.active(), headers);
  return headers;
}

export function getCurrentTraceContext(): { traceId: string; spanId: string } | null {
  const activeSpan = trace.getActiveSpan();
  if (activeSpan) {
    const spanContext = activeSpan.spanContext();
    return {
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
    };
  }
  return null;
}

export async function shutdownOtel() {
  if (loggerProvider) {
    await loggerProvider.shutdown();
  }
}
