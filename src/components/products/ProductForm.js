import React, { useState } from "react";

export default function ProductForm({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageFile: null,
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.price) newErrors.price = "Price is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.imageFile) newErrors.imageFile = "Product image is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Prepare data for submission
            const submissionData = new FormData();
            submissionData.append("name", formData.name);
            submissionData.append("description", formData.description);
            submissionData.append("price", formData.price);
            submissionData.append("category", formData.category);
            submissionData.append("image", formData.imageFile);

            onSubmit(submissionData); // Assuming onSubmit handles FormData
            onClose(); // Close modal
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Other inputs (same as before) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-2 border ${errors.price ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="e.g. Shirts, Shoes"
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`mt-1 w-full px-4 py-2 border ${errors.imageFile ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
