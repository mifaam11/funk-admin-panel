"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";

export default function ClientLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === "/login";

    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            router.replace("/login");
        } else if (isAuthenticated && isLoginPage) {
            router.replace("/");
        }
    }, [isAuthenticated, pathname]);

    // ✅ Don't flash layout on login page
    if (isLoginPage) return children;

    // ✅ Wait for auth to be determined
    if (!isAuthenticated) return null;

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(prev => !prev)} />
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</main>
            </div>
        </div>
    );
}
