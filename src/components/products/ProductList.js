"use client";
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Import reusable API functions
import { getData, deleteData } from "@/utils/api";

export default function ProductList() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsPerPage = 5;

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getData("/");
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setError(error.message || "Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            setLoading(true);
            await deleteData(`/${id}`);
            toast.success("Product deleted");
            const updatedProducts = await getData("/");
            setProducts(updatedProducts);
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        Object.values(product).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

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
                    <Link
                        href="/products/add"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add Product</span>
                    </Link>
                </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["name", "category", "price", "stock"].map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort(key)}
                                >
                                    <div className="flex items-center">
                                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        {sortConfig.key === key && (
                                            sortConfig.direction === "ascending" ? (
                                                <FiChevronUp className="ml-1" />
                                            ) : (
                                                <FiChevronDown className="ml-1" />
                                            )
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.length > 0 ? currentProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₹{product.price?.toFixed(2)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(product.status)}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Link
                                            href={`/products/add/${product._id}`}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                                        >
                                            <FiEdit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    {products.length === 0 ? "No products available" : "No products match your search"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {products.length > 0 && (
                <div className="px-4 py-3 bg-gray-50 border-t flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-3 md:mb-0 text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">{Math.min(indexOfLastProduct, sortedProducts.length)}</span> of <span className="font-medium">{sortedProducts.length}</span> results
                    </div>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-100"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border rounded-md text-sm font-medium ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
