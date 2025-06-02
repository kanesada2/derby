import { Enhancement } from '@/domain/models/valueObjects/enhancement';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnhancementContextType {
  enhancement: Enhancement;
  setEnhancement: (enhancement: Enhancement) => void;
}

const EnhancementContext = createContext<EnhancementContextType | undefined>(undefined);

interface EnhancementProviderProps {
  children: ReactNode;
}

export function EnhancementProvider({ children }: EnhancementProviderProps) {
  const [enhancement, setEnhancement] = useState<Enhancement>(new Enhancement(0, 0, 0));

  return (
    <EnhancementContext.Provider value={{ enhancement, setEnhancement }}>
      {children}
    </EnhancementContext.Provider>
  );
}

export function useEnhancement() {
  const context = useContext(EnhancementContext);
  if (context === undefined) {
    throw new Error('useEnhancement must be used within an EnhancementProvider');
  }
  return context;
}
