/* /context/AppContext.js */
import { createContext } from 'react';
import React from "react";
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const MyContext = React.createContext(
    "default value"
    );
export default MyContext;