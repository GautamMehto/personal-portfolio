import React, { createContext, useContext, useState } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const [mode, setMode] = useState("default");

    return (
        <CursorContext.Provider value={{ mode, setMode }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);