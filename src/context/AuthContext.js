"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("funk_admin_logged_in");
        setIsAuthenticated(storedAuth === "true");
    }, []);

    const login = () => {
        localStorage.setItem("funk_admin_logged_in", "true");
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("funk_admin_logged_in");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
