"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaBars, FaTimes, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Header = ({ toggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef();
    const router = useRouter();
    const { logout } = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        // Close all menus
        setDropdownOpen(false);
        setMobileMenuOpen(false);

        // Perform logout
        logout();

        // Redirect to login page
        router.push("/admin/login");
    };

    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 sm:px-6 relative z-50">
            {/* Left section - menu button (mobile only) */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
                >
                    <FaBars className="text-xl" />
                </button>
            </div>

            {/* Centered logo (mobile) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
                <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                    Funk Admin
                </h1>
            </div>

            {/* Desktop logo (left aligned) */}
            <div className="hidden md:flex items-center">
                <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Funk Admin
                </h1>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6">
                {/* Notification Icon */}
                <button className="relative p-1 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-full hover:bg-gray-100">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* Profile Section */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center gap-2 group focus:outline-none"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                        aria-label="User menu"
                    >
                        <div className="relative">
                            <FaUserCircle className="text-2xl text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="hidden lg:flex flex-col items-start">
                            <span className="text-sm font-medium text-gray-700">Admin User</span>
                            <span className="text-xs text-gray-500">Administrator</span>
                        </div>
                    </button>

                    {/* Dropdown with CSS transition */}
                    <div
                        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-200 ease-out ${dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}
                    >
                        <ul className="py-1">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <FaUserCircle className="mr-3 text-gray-500" />
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <FaCog className="mr-3 text-gray-500" />
                                    Settings
                                </a>
                            </li>
                            <li className="border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <FaSignOutAlt className="mr-3" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile menu button (right side) */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Mobile menu"
            >
                {mobileMenuOpen ? (
                    <FaTimes className="text-xl" />
                ) : (
                    <FaUserCircle className="text-xl" />
                )}
            </button>

            {/* Mobile menu with CSS transition */}
            <div
                className={`fixed inset-0 top-16 bg-white shadow-lg md:hidden z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                style={{ display: mobileMenuOpen ? 'block' : 'none' }}
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                        <FaUserCircle className="text-3xl text-gray-600" />
                        <div>
                            <p className="font-medium text-gray-900">Admin User</p>
                            <p className="text-sm text-gray-500">Administrator</p>
                        </div>
                    </div>
                </div>

                <ul className="py-2">
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                        >
                            <FaBell className="mr-3" />
                            Notifications
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                        >
                            <FaUserCircle className="mr-3" />
                            My Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                        >
                            <FaCog className="mr-3" />
                            Settings
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors"
                        >
                            <FaSignOutAlt className="mr-3" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;