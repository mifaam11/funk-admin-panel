import ProductList from "@/components/products/ProductList";
// import ProductForm from "@/components/products/ProductForm";

export default function Page() {
    return (
        <div className="ml-0 md:ml-64 "> {/* Adjust margin-left for sidebar and padding-top for navbar */}
            <div className="p-4 md:p-8"> {/* Add padding for content */}
                <div className="space-y-8">
                    <ProductList />
                    {/* <ProductForm /> */}
                </div>
            </div>
        </div>
    );
}