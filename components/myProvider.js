import React, { useState } from 'react';
import MyContext from './context';

export function MyProvider({ children }) {
  const [user, setUser] = useState('Null');
  const [email, setEmail] = useState('Null');
  const [cart, setCart] = useState({ items: [], totalAmount: 0 }); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <MyContext.Provider value={{ user, setUser, email, setEmail, cart, setCart, isAuthenticated, setIsAuthenticated }}>
      {children}
    </MyContext.Provider>
  );
}