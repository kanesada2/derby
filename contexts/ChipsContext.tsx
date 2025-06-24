import { ChipCollection } from '@/domain/models/entities/chip';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ChipsContextType {
  chips: ChipCollection;
  setChips: (chips: ChipCollection) => void;
}

const ChipsContext = createContext<ChipsContextType | undefined>(undefined);

interface ChipsProviderProps {
  children: ReactNode;
}

export function ChipsProvider({ children }: ChipsProviderProps) {
  const [chips, setChips] = useState<ChipCollection>(new  ChipCollection([]));;

  return (
    <ChipsContext.Provider value={{ chips, setChips }}>
      {children}
    </ChipsContext.Provider>
  );
}

export function useChips() {
  const context = useContext(ChipsContext);
  if (context === undefined) {
    throw new Error('useChips must be used within an ChipsProvider');
  }
  return context;
}