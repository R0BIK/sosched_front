import { createContext, useContext } from 'react';

export const SpaceContext = createContext();

export const useSpace = () => {
    const context = useContext(SpaceContext);
    if (!context) {
        throw new Error("useSpace must be used within a SpaceProvider");
    }
    return context;
};