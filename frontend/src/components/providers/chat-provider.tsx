'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-provider';
import { otelLog } from '@/lib/otel/instrumentation';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const createDefaultMessage = (): Message => ({
  id: Date.now().toString(),
  role: 'assistant',
  content: "Hi! I'm your event assistant. How can I help you today?",
  timestamp: new Date(),
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([createDefaultMessage()]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const clearChat = () => {
    otelLog.info("Clearing chat history for userId: {}", { userId: user?.userId });
    setMessages([createDefaultMessage()]);
  };

  useEffect(() => {
    if (user?.userId) {
      otelLog.info("User context changed, clearing chat for userId: {}", { userId: user.userId });
    }
    clearChat();    
  }, [user?.userId]);

  return (
    <ChatContext.Provider value={{ messages, setMessages, isOpen, setIsOpen, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
