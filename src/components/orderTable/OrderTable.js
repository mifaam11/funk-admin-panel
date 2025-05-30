export default function OrderTable({ orders }) {
    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">
                <p className="text-gray-500">No orders found</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Processing":
                return "bg-blue-100 text-blue-800";
            case "Cancelled":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-green-100 text-green-800";
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {["Order ID", "Customer", "Date", "Total", "Payment", "Status", "Actions"].map((header) => (
                            <th
                                key={header}
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.customerName}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(order.date)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ₹{order.total.toLocaleString("en-IN")}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.paymentStatus === "Paid"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {order.paymentStatus}
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(order.orderStatus)}`}
                                >
                                    {order.orderStatus}
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">
                                    View
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}