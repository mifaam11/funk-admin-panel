// ✅ AddProductPage.js
"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { postData } from "@/utils/api";

const ProductForm = dynamic(() => import("@/components/products/ProductForm"), {
    ssr: false,
});

export default function AddProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const { name, description, price, category, stock, status, image } = formData;

            // Validate required fields
            if (!name || !price || !stock || !image) {
                throw new Error("Name, price, stock, and image are required.");
            }

            let imageUrl = "";

            // Handle Cloudinary image upload
            if (image instanceof File) {
                const uploadData = new FormData();
                uploadData.append("file", image);
                uploadData.append("upload_preset", "funk_products");

                const cloudinaryRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/du7l08d8j/image/upload",
                    uploadData
                );

                imageUrl = cloudinaryRes.data.secure_url;

                if (!imageUrl) {
                    throw new Error("Image upload failed.");
                }
            } else if (typeof image === "string") {
                imageUrl = image;
            } else {
                throw new Error("Invalid image format.");
            }

            // Prepare payload
            const payload = {
                name,
                description,
                price: parseFloat(price),
                category,
                stock: parseInt(stock),
                status,
                image: imageUrl,
            };

            // POST using reusable function
            await postData("/", payload);

            alert("Product added successfully!");
            router.push("/products");
        } catch (err) {
            console.error("Error submitting product:", err);
            const message = err.response?.data?.message || err.message || "Something went wrong.";
            alert("Error: " + message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ml-0 md:ml-64 p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => router.push("/products")}
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <FiArrowLeft className="text-lg" />
                        Back to Products
                    </button>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Add New Product
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Fill out the form below to add a new product to your inventory.
                        </p>
                    </div>

                    <ProductForm
                        mode="add"
                        isSubmitting={isSubmitting}
                        onSubmit={handleFormSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
