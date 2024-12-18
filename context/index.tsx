import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StateContextType {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};

export const StateProvider = ({ children }: { children: ReactNode }) => {

    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <StateContext.Provider value={{ isAdmin , setIsAdmin }}>
            {children}
        </StateContext.Provider>
    )
}