import { useState, createContext, useContext, ReactNode } from 'react';

import useChat from '../hooks/useChat';

const appContext = createContext({
  isChatOpen: false,
});

const chatProvider = ({ children }: { children: ReactNode }) => {
    
};
