import OrderTable from "@/components/orderTable/OrderTable";

const dummyOrders = [
    {
        id: "ORD12345",
        customerName: "Ali Khan",
        date: "2025-05-26",
        total: 1999,
        paymentStatus: "Paid",
        orderStatus: "Processing",
    },
    {
        id: "ORD12346",
        customerName: "Fatima Shaikh",
        date: "2025-05-25",
        total: 2499,
        paymentStatus: "Unpaid",
        orderStatus: "Cancelled",
    },
];

export default function OrdersPage() {
    return (
        <div className="ml-0 md:ml-64 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Orders</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                        Export
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Create Order
                    </button>
                </div>
            </div>
            <OrderTable orders={dummyOrders} />
        </div>
    );
}