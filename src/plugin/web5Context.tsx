import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Web5 } from '@web5/api';
import { useDispatch } from 'react-redux';

interface Web5ContextType {
  web5: any;
  myDID: string | null;
}

const Web5Context = createContext<Web5ContextType>({ web5: null, myDID: null });

interface Web5ProviderProps {
  children: ReactNode;
}

export const Web5Provider: React.FC<Web5ProviderProps> = ({ children }) => {
  const [web5, setWeb5] = useState<any>(null);
  const [myDID, setMyDID] = useState<string | null>(null);

  useEffect(() => {
    async function connect() {
      const { web5, did } = await Web5.connect({
        sync: '5s',
      });
      setWeb5(web5);
      setMyDID(did);

      let dispatch = useDispatch();
      
    }

    connect();
  }, []);

  return <Web5Context.Provider value={{ web5, myDID }}>{children}</Web5Context.Provider>;
};

// Hook for other components to use the web5 and myDID
export const useWeb5 = () => useContext(Web5Context);