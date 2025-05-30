"use client";

import React, { useState } from "react";
import { FiSave, FiUser, FiShoppingBag, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";

export default function AdminSettings() {
    // Store settings state
    const [storeName, setStoreName] = useState("Funk Store");
    const [supportEmail, setSupportEmail] = useState("support@funkstore.com");
    const [storeLogo, setStoreLogo] = useState(null);

    // Admin profile state
    const [adminName, setAdminName] = useState("Ifam");
    const [adminEmail, setAdminEmail] = useState("admin@funkstore.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // UI state
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!storeName.trim()) newErrors.storeName = "Store name is required";
        if (!validateEmail(supportEmail)) newErrors.supportEmail = "Invalid email address";
        if (!adminName.trim()) newErrors.adminName = "Admin name is required";
        if (!validateEmail(adminEmail)) newErrors.adminEmail = "Invalid email address";

        if (newPassword) {
            if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
            if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

            // In a real app, you would call your API here
            // await saveSettings({ storeName, supportEmail, adminName, adminEmail, newPassword });
        }, 1500);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStoreLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="ml-0 md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your store and admin profile settings</p>
                    </div>

                    {showSuccess && (
                        <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-md">
                            <FiCheckCircle className="mr-2" />
                            Settings saved successfully!
                        </div>
                    )}
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    {/* Store Settings Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FiShoppingBag className="mr-2 text-blue-600" />
                                Store Settings
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Store Logo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                                <div className="flex items-center space-x-6">
                                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden border border-gray-200">
                                        {storeLogo ? (
                                            <img src={storeLogo} alt="Store logo" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <FiShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="cursor-pointer">
                                            <span className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                Change Logo
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoUpload}
                                            />
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF (Max 2MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Store Name */}
                            <div>
                                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Store Name
                                </label>
                                <input
                                    id="storeName"
                                    type="text"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    className={`w-full px-3 py-2 border ${errors.storeName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.storeName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
                                )}
                            </div>

                            {/* Support Email */}
                            <div>
                                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Support Email
                                </label>
                                <input
                                    id="supportEmail"
                                    type="email"
                                    value={supportEmail}
                                    onChange={(e) => setSupportEmail(e.target.value)}
                                    className={`w-full px-3 py-2 border ${errors.supportEmail ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.supportEmail && (
                                    <p className="mt-1 text-sm text-red-600">{errors.supportEmail}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Admin Profile Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FiUser className="mr-2 text-blue-600" />
                                Admin Profile
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Admin Name */}
                            <div>
                                <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    id="adminName"
                                    type="text"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                    className={`w-full px-3 py-2 border ${errors.adminName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.adminName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>
                                )}
                            </div>

                            {/* Admin Email */}
                            <div>
                                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="adminEmail"
                                    type="email"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
                                    className={`w-full px-3 py-2 border ${errors.adminEmail ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.adminEmail && (
                                    <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>
                                )}
                            </div>

                            {/* Change Password Section */}
                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <FiLock className="mr-2 text-gray-500" />
                                    Change Password
                                </h3>

                                <div className="space-y-4">
                                    {/* Current Password */}
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter current password"
                                        />
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className={`w-full px-3 py-2 border ${errors.newPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Enter new password"
                                        />
                                        {errors.newPassword && (
                                            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Confirm new password"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`px-6 py-3 rounded-md shadow-sm text-white font-medium flex items-center ${isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FiSave className="mr-2" />
                                    Save Settings
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}