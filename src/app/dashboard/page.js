"use client";

import React from "react";
import { FiUsers, FiShoppingCart, FiPackage, FiDollarSign, FiActivity, FiCalendar, FiTrendingUp } from "react-icons/fi";

export default function AdminDashboard() {
    // Dummy stats (replace with API later)
    const stats = [
        {
            label: "Total Users",
            value: 128,
            change: "+12%",
            icon: <FiUsers className="w-6 h-6" />,
            color: "bg-blue-50",
            text: "text-blue-600",
            border: "border-blue-200"
        },
        {
            label: "Total Orders",
            value: 342,
            change: "+24%",
            icon: <FiShoppingCart className="w-6 h-6" />,
            color: "bg-green-50",
            text: "text-green-600",
            border: "border-green-200"
        },
        {
            label: "Total Products",
            value: 89,
            change: "+5%",
            icon: <FiPackage className="w-6 h-6" />,
            color: "bg-yellow-50",
            text: "text-yellow-600",
            border: "border-yellow-200"
        },
        {
            label: "Total Revenue",
            value: "₹1,45,200",
            change: "+18%",
            icon: <FiDollarSign className="w-6 h-6" />,
            color: "bg-purple-50",
            text: "text-purple-600",
            border: "border-purple-200"
        },
    ];

    // Recent orders data
    const recentOrders = [
        { id: "#ORD-001", customer: "Aarav Patel", amount: "₹2,499", status: "Delivered", date: "2025-05-28" },
        { id: "#ORD-002", customer: "Neha Sharma", amount: "₹1,799", status: "Shipped", date: "2025-05-27" },
        { id: "#ORD-003", customer: "Rahul Singh", amount: "₹3,299", status: "Processing", date: "2025-05-26" },
        { id: "#ORD-004", customer: "Priya Gupta", amount: "₹4,599", status: "Delivered", date: "2025-05-25" },
        { id: "#ORD-005", customer: "Vikram Joshi", amount: "₹1,299", status: "Cancelled", date: "2025-05-24" },
    ];

    return (
        <div className="ml-0 md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                        <FiCalendar className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`rounded-xl border ${stat.border} p-6 ${stat.color} transition-all hover:shadow-md`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                                    <div className={`mt-2 text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.color} ${stat.text}`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className={`flex items-center ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change.startsWith('+') ? (
                                        <FiTrendingUp className="mr-1" />
                                    ) : (
                                        <FiTrendingUp className="mr-1 transform rotate-180" />
                                    )}
                                    {stat.change}
                                </span>
                                <span className="text-gray-500 ml-2">vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Sales Chart (Placeholder) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
                            <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                            </select>
                        </div>
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <FiActivity className="w-12 h-12 mr-2" />
                            <span>Sales chart will appear here</span>
                        </div>
                    </div>

                    {/* Revenue Breakdown (Placeholder) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h2>
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <FiDollarSign className="w-12 h-12 mr-2" />
                            <span>Revenue chart will appear here</span>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.date).toLocaleDateString('en-IN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 text-right">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View all orders →
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition">
                        <div className="bg-blue-100 p-3 rounded-full mb-2">
                            <FiUsers className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Manage Users</span>
                    </button>
                    <button className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition">
                        <div className="bg-green-100 p-3 rounded-full mb-2">
                            <FiShoppingCart className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">View Orders</span>
                    </button>
                    <button className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition">
                        <div className="bg-purple-100 p-3 rounded-full mb-2">
                            <FiPackage className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Add Product</span>
                    </button>
                    <button className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:bg-gray-50 transition">
                        <div className="bg-yellow-100 p-3 rounded-full mb-2">
                            <FiDollarSign className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">View Reports</span>
                    </button>
                </div>
            </div>
        </div>
    );
}