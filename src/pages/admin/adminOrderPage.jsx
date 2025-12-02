import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Package, Calendar, DollarSign, Clock, X } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in as admin");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load orders");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const getStatusColor = (status) => {
    const colors = {
      preparing: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      paused: "bg-yellow-100 text-yellow-800",
      pended: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status, notes: order.notes || "" });
    setUpdateModalVisible(true);
  };

  const closeModals = () => {
    setSelectedOrder(null);
    setDetailModalVisible(false);
    setUpdateModalVisible(false);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Order updated successfully!");
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === selectedOrder.orderId
              ? { ...o, ...updateData }
              : o
          )
        );
        closeModals();
      })
      .catch(() => toast.error("Update failed"));
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          Admin Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No orders found</div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Order ID</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Total</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {formatDate(order.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        <div className="flex items-center gap-2">
                          <DollarSign size={18} />
                          LKR {calculateTotal(order.orderedItems).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUpdateOrder(order)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailModalVisible && selectedOrder && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          Order Details
          <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
            #{selectedOrder.orderId}
          </span>
        </h2>
        <p className="mt-2 text-blue-100">
          {new Date(selectedOrder.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Body - Scrollable if needed */}
      <div className="p-6 overflow-y-auto max-h-[60vh]">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600 font-medium">Customer Name</p>
            <p className="text-lg font-semibold text-gray-900">{selectedOrder.name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600 font-medium">Phone</p>
            <p className="text-lg font-semibold text-gray-900">{selectedOrder.phone}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl md:col-span-2">
            <p className="text-sm text-amber-700 font-medium">Delivery Address</p>
            <p className="text-gray-800 font-medium mt-1">{selectedOrder.address}</p>
          </div>
          {selectedOrder.notes && (
            <div className="bg-blue-50 p-4 rounded-xl md:col-span-2">
              <p className="text-sm text-blue-700 font-medium">Customer Notes</p>
              <p className="text-gray-700 italic mt-1">"{selectedOrder.notes}"</p>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-sm font-medium text-gray-600">Order Status</span>
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
            selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
            selectedOrder.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
            selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {selectedOrder.status}
          </span>
        </div>

        {/* Ordered Items */}
        <h3 className="text-lg font-bold text-gray-800 mb-4">Ordered Items</h3>
        <div className="space-y-4">
          {selectedOrder.orderedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-sm text-gray-600">
                    <p>Price: <span className="font-bold text-gray-900">LKR {Number(item.price).toFixed(2)}</span></p>
                    <p>Qty: <span className="font-bold text-gray-900">{item.quantity}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-5 border-t-2 border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total Amount</span>
            <span className="text-3xl font-extrabold text-blue-600">
              LKR {selectedOrder.orderedItems
                .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-2xl">
        <button
          onClick={closeModals}
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition duration-200 shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* Update Modal */}
      {updateModalVisible && selectedOrder && (
        <Modal onClose={closeModals}>
          <h2 className="text-2xl font-bold mb-6">Update Order Status</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={updateData.status}
                onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {["preparing", "cancelled", "delivered", "completed", "paused", "pended"].map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Admin Notes</label>
              <textarea
                value={updateData.notes}
                onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Optional internal notes..."
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeModals} className="px-5 py-2 border rounded-lg hover:bg-gray-100">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Reusable Components
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={28} />
        </button>
        {children}
      </div>
    </div>
  </div>
);

const Info = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="text-blue-600 mt-1">{icon}</span>}
    <div>
      <span className="font-medium text-gray-600">{label}:</span>{" "}
      <span className="text-gray-900">{value}</span>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    preparing: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || "bg-gray-100"}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>;
};