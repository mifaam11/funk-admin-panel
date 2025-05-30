"use client";

import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import ProductForm from "./ProductForm";

const initialProducts = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Clothing",
        price: 19.99,
        stock: 120,
        status: "In Stock",
    },
    {
        id: 2,
        name: "Premium Running Shoes",
        category: "Footwear",
        price: 89.99,
        stock: 45,
        status: "Low Stock",
    },
    {
        id: 3,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 59.99,
        stock: 200,
        status: "In Stock",
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        category: "Accessories",
        price: 24.99,
        stock: 0,
        status: "Out of Stock",
    },
];

export default function ProductList() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const productsPerPage = 5;

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        Object.values(product).some(
            value => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800";
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800";
            case "Out of Stock":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleFormSubmit = (productData) => {
        if (editingProduct) {
            // Update existing product
            setProducts(products.map(p =>
                p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
            ));
        } else {
            // Add new product
            const newId = Math.max(...products.map(p => p.id), 0) + 1;
            setProducts([...products, { ...productData, id: newId }]);
        }
        setShowForm(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header and Search */}
            <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <FiPlus />
                        <span className="hidden sm:inline">Add Product</span>
                    </button>
                </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('name')}
                            >
                                <div className="flex items-center">
                                    <span>Name</span>
                                    {sortConfig.key === 'name' && (
                                        sortConfig.direction === 'ascending' ?
                                            <FiChevronUp className="ml-1" /> :
                                            <FiChevronDown className="ml-1" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('category')}
                            >
                                <div className="flex items-center">
                                    <span>Category</span>
                                    {sortConfig.key === 'category' && (
                                        sortConfig.direction === 'ascending' ?
                                            <FiChevronUp className="ml-1" /> :
                                            <FiChevronDown className="ml-1" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('price')}
                            >
                                <div className="flex items-center">
                                    <span>Price</span>
                                    {sortConfig.key === 'price' && (
                                        sortConfig.direction === 'ascending' ?
                                            <FiChevronUp className="ml-1" /> :
                                            <FiChevronDown className="ml-1" />
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('stock')}
                            >
                                <div className="flex items-center">
                                    <span>Stock</span>
                                    {sortConfig.key === 'stock' && (
                                        sortConfig.direction === 'ascending' ?
                                            <FiChevronUp className="ml-1" /> :
                                            <FiChevronDown className="ml-1" />
                                    )}
                                </div>
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.category}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.stock}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(product.status)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                            >
                                                <FiEdit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination and Summary */}
            <div className="px-4 py-3 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between">
                <div className="mb-3 md:mb-0">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(indexOfLastProduct, sortedProducts.length)}
                        </span>{' '}
                        of <span className="font-medium">{sortedProducts.length}</span> results
                    </p>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded-md text-sm font-medium ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-30 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-lg font-semibold">
                                {editingProduct ? "Edit Product" : "Add New Product"}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4">
                            <ProductForm
                                product={editingProduct}
                                onSubmit={handleFormSubmit}
                                onClose={() => setShowForm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}