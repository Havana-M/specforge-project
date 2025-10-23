// This file is frontend/context/SpecContext.tsx
"use client";

import { createContext, useState, ReactNode, useContext } from 'react';

// Define the "shape" of our shared memory
type SpecContextType = {
  spec: any; // This will hold our spec object (JSON or YAML)
  setSpec: (spec: any) => void; // This is the function to change it
};

// Create the context with a default (empty) value
const SpecContext = createContext<SpecContextType | undefined>(undefined);

// Create the "Provider" component. This is the component
// that will wrap our entire app to give it access to the memory.
export const SpecProvider = ({ children }: { children: ReactNode }) => {
  const [spec, setSpec] = useState<any>(null);

  return (
    <SpecContext.Provider value={{ spec, setSpec }}>
      {children}
    </SpecContext.Provider>
  );
};

// Create a simple "hook" to make it easy for our pages
// to access the shared memory.
export const useSpec = () => {
  const context = useContext(SpecContext);
  if (context === undefined) {
    throw new Error('useSpec must be used within a SpecProvider');
  }
  return context;
};