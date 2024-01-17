import React, { useState } from 'react';
import MyContext from './context';

export function MyProvider({ children }) {
  const [user, setUser] = useState('Null');
  const [restId, setRestId] = useState(0);

  return (
    <MyContext.Provider value={{ user, setUser, restId, setRestId }}>
      {children}
    </MyContext.Provider>
  );
}