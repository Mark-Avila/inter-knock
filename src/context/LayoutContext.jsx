import { createContext, useState } from "react";

export const LayoutContext = createContext();

export function LayoutProvider({ children }) {
    
    const [navItems, setNavItems] = useState([]);

    const setNavigation = (newItems) => {
        setNavItems(newItems)
    }

    return ( 
        <LayoutContext.Provider value={{ setNavigation, navItems }}>
            {children}
        </LayoutContext.Provider>
    );
}