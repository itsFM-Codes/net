'use client';

import { useEffect } from 'react';
import { initializeOtel } from '@/lib/otel/instrumentation';

export function OtelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeOtel();
  }, []);

  return <>{children}</>;
}
