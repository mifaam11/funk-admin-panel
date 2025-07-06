"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import ProductForm from "@/components/products/ProductForm";
import { getData, putData, deleteData } from "@/utils/api";
import axios from "axios";

export default function EditProductPage() {
    const router = useRouter();
    const { id: productId } = useParams();

    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch product details
    useEffect(() => {
        if (!productId) return;

        const fetchProduct = async () => {
            try {
                const product = await getData(`${productId}`);
                setInitialData(product);
            } catch (err) {
                console.error("Error fetching product:", err);
                toast.error(err?.response?.data?.message || "Failed to fetch product");
                router.push("/products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId, router]);

    // Handle update
    const handleSubmit = async (formData) => {
        try {
            let imageUrl = initialData?.image || "";

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

            await putData(`${productId}`, payload);
            toast.success("Product updated successfully");
            router.push("/products");
            router.refresh();
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error(err?.response?.data?.message || "Update failed");
        }
    };

    // Handle delete
    const handleDelete = async () => {
        try {
            await deleteData(`${productId}`);
            toast.success("Product deleted successfully");
            router.push("/products");
        } catch (err) {
            console.error("Error deleting product:", err);
            toast.error(err?.response?.data?.message || "Delete failed");
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-600 rounded-full" />
            </div>
        );
    }

    // Product not found
    if (!initialData) {
        return <div className="p-6">Product not found</div>;
    }

    // Form UI
    return (
        <div className="ml-0 md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductForm
                mode="edit"
                productId={productId}
                initialData={initialData}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </div>
    );
}
