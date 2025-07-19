"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductForm({
    mode = "add",
    productId,
    initialData = null,
    onSubmit,
    isSubmitting
}) {
    const router = useRouter();
    const isEditMode = mode === "edit";

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        status: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                category: initialData.category || "",
                stock: initialData.stock || "",
                status: initialData.status || "",
                image: null,
            });
            setPreviewImage(initialData.image || "");
        }
    }, [initialData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEditMode) return onSubmit?.(formData);

        setIsLoading(true);
        try {
            let imageUrl = previewImage;

            if (formData.image instanceof File) {
                const uploadData = new FormData();
                uploadData.append("file", formData.image);
                uploadData.append("upload_preset", "funk_products");

                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/du7l08d8j/image/upload",
                    uploadData
                );

                imageUrl = res.data.secure_url;
            }

            const payload = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                stock: parseInt(formData.stock),
                status: formData.status,
                image: imageUrl,
            };

            await axios.put(`${BASE_URL}/${productId}`, payload);
            toast.success("Product updated successfully");
            router.push("/products");
            router.refresh();
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setIsLoading(false);
        } e
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            setIsLoading(true);
            await axios.delete(`${BASE_URL}/${productId}`);
            toast.success("Product deleted");
            router.push("/products");
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete product");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => router.push("/products");

    if (isEditMode && isLoading && !formData.name) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-600 rounded-full" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    {isEditMode ? (
                        <>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                            <input
                                type="text"
                                value={productId}
                                readOnly
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </>
                    ) : (
                        <div className="h-0" /> // Keeps spacing same in "add" mode
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <input
                        name="category"
                        type="text"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                    <input
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select status</option>
                        <option value="products">Products</option>
                        <option value="flash-sale">Flash Sale</option>
                    </select>

                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="h-40 mt-4 object-contain border rounded-md"
                        />
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                    disabled={isLoading}
                >
                    Cancel
                </button>

                <div className="flex gap-3">
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            disabled={isLoading}
                        >
                            Delete
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={isLoading || isSubmitting}
                    >
                        {isLoading || isSubmitting
                            ? isEditMode ? "Updating..." : "Adding..."
                            : isEditMode ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </form>
    );
}
