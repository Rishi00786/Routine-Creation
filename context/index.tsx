import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Routine {
    id: string;
    name: string;
    description: string;
    duration: string;
    milestones: string;
    steps: string[];
    benefits: string[];
    imagePreview: string;
    preBuilt?: boolean;
}

interface UserProgress {
    complete: boolean;
    progress: number;
}

interface StateContextType {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
    yourRoutines: Routine[];
    setYourRoutines: React.Dispatch<React.SetStateAction<never[]>>
    preBuiltRoutines: Routine[];
    setPreBuiltRoutines: React.Dispatch<React.SetStateAction<never[]>>
    allRoutines: Routine[];
    setAllRoutines: React.Dispatch<React.SetStateAction<never[]>>
    myRoutines: Routine[];
    setMyRoutines: React.Dispatch<React.SetStateAction<never[]>>
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>
    showRoutineBuilder: boolean;
    setShowRoutineBuilder: React.Dispatch<React.SetStateAction<boolean>>
    id: string;
    setId: React.Dispatch<React.SetStateAction<string>>;
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

    const [isAdmin, setIsAdmin] = useState(() => {
        const admin = localStorage.getItem('admin');
        return admin === 'true';
    });    

    const [yourRoutines, setYourRoutines] = useState([])
    const [preBuiltRoutines, setPreBuiltRoutines] = useState([])
    const [allRoutines, setAllRoutines] = useState([])
    const [myRoutines, setMyRoutines] = useState([])
    const [sidebar, setSidebar] = useState(false)
    const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);
    const [id, setId] = useState("");


    return (
        <StateContext.Provider value={{ 
            isAdmin, setIsAdmin, yourRoutines, setYourRoutines, setPreBuiltRoutines,
            preBuiltRoutines, allRoutines, setAllRoutines, setMyRoutines, myRoutines,
            sidebar, setSidebar, showRoutineBuilder, setShowRoutineBuilder, id, setId
        }}>
            {children}
        </StateContext.Provider>
    )
}