import { createContext, useState } from "react";
import { FairyNotification } from "../components";

export const FairyContext = createContext();

export function FairyProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info', duration = 2000) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            triggerExiting(id);
            setTimeout(() => {
                removeNotification(id)
            }, 2000)
        }, duration);
    };

    const triggerExiting = (id) => {
        setNotifications((prev) => {
            const updatedNotifications = prev.map(n => 
                n.id === id ? { ...n, exiting: true } : n
            );

            return updatedNotifications;
        });
    }

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter(n => n.id !== id));
    };

    return ( 
        <FairyContext.Provider value={{ addNotification }}>
            {children}
            <FairyNotification 
                notifications={notifications} 
                removeNotification={removeNotification} 
            />
        </FairyContext.Provider>
     );
}
