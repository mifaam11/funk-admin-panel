"use client";

import React from "react";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingBag,
    FaUsers,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = ({ isOpen }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
            <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
                <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Funk Admin
                </h2>
            </div>

            <nav className="flex flex-col py-4 px-4 space-y-2">
                <SidebarLink href="/" icon={<FaTachometerAlt />} label="Dashboard" />
                <SidebarLink href="/products" icon={<FaBoxOpen />} label="Products" />
                <SidebarLink href="/orders" icon={<FaShoppingBag />} label="Orders" />
                <SidebarLink href="/users" icon={<FaUsers />} label="Customers" />
                <SidebarLink href="/settings" icon={<FaCog />} label="Settings" />
                {/* <SidebarLink
                    href="#"
                    icon={<FaSignOutAlt />}
                    label="Logout"
                    className="text-red-600 hover:bg-red-100"
                /> */}
            </nav>
        </aside>
    );
};

const SidebarLink = ({ href, icon, label, className = "" }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium ${className}`}
    >
        <span className="text-lg">{icon}</span>
        <span className="text-sm">{label}</span>
    </Link>
);

export default Sidebar;
