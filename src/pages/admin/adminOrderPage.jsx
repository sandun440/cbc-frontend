import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Package, Calendar, X } from "lucide-react";

const STATUS_STYLES = {
  preparing:  "bg-amber-100 text-amber-800",
  delivered:  "bg-emerald-100 text-emerald-800",
  completed:  "bg-blue-100 text-blue-800",
  cancelled:  "bg-red-100 text-red-800",
  paused:     "bg-slate-100 text-slate-700",
  pended:     "bg-purple-100 text-purple-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please log in as admin"); return; }
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => { setOrders(res.data); setLoading(false); })
    .catch(() => { toast.error("Failed to load orders"); setLoading(false); });
  }, []);

  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const handleViewDetails = (order) => { setSelectedOrder(order); setDetailModalVisible(true); };
  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status, notes: order.notes || "" });
    setUpdateModalVisible(true);
  };
  const closeModals = () => { setSelectedOrder(null); setDetailModalVisible(false); setUpdateModalVisible(false); };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      toast.success("Order updated successfully!");
      setOrders((prev) => prev.map((o) => o.orderId === selectedOrder.orderId ? { ...o, ...updateData } : o));
      closeModals();
    })
    .catch(() => toast.error("Update failed"));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-dark">Orders</h2>
        <p className="text-secondary text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-accent/8">
          <Package className="w-12 h-12 text-accent/30 mx-auto mb-3" />
          <p className="font-playfair text-xl text-dark">No orders found</p>
          <p className="text-secondary text-sm mt-1">Orders will appear here once placed.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1008] text-white text-xs uppercase tracking-wider">
                  <th className="px-5 py-4 text-left">Order ID</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-left">Date</th>
                  <th className="px-5 py-4 text-right">Total</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-primary/40 transition-colors duration-150">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-secondary bg-gray-100 px-2 py-1 rounded-lg">
                        #{order.orderId?.slice(-8)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700"}`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-secondary text-sm flex items-center gap-2">
                      <Calendar size={13} className="text-accent" />
                      {formatDate(order.date)}
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-emerald-600 text-sm">
                      LKR {calculateTotal(order.orderedItems).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="px-3 py-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-white text-xs font-semibold rounded-lg transition-all duration-200"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUpdateOrder(order)}
                          className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white text-xs font-semibold rounded-lg transition-all duration-200"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModals}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-[#1a1008] text-white p-6 flex items-start justify-between">
              <div>
                <h2 className="font-playfair text-xl font-bold">Order Details</h2>
                <p className="text-white/60 text-xs mt-1 font-mono">#{selectedOrder.orderId}</p>
              </div>
              <button onClick={closeModals} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[65vh] space-y-5">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Customer Name", value: selectedOrder.name },
                  { label: "Phone", value: selectedOrder.phone },
                ].map((info) => (
                  <div key={info.label} className="bg-primary/50 rounded-xl p-4">
                    <p className="text-xs text-secondary mb-1">{info.label}</p>
                    <p className="font-semibold text-dark text-sm">{info.value}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-accent/8 rounded-xl p-4">
                  <p className="text-xs text-accent mb-1">Delivery Address</p>
                  <p className="font-semibold text-dark text-sm">{selectedOrder.address}</p>
                </div>
                {selectedOrder.notes && (
                  <div className="col-span-2 bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-blue-600 mb-1">Notes</p>
                    <p className="text-dark text-sm italic">"{selectedOrder.notes}"</p>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">Order Status</span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_STYLES[selectedOrder.status] || "bg-gray-100"}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-playfair text-base font-bold text-dark mb-3">Ordered Items</h3>
                <div className="space-y-3">
                  {selectedOrder.orderedItems.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-primary/40 rounded-xl p-3 items-center">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-semibold text-dark text-sm">{item.name}</p>
                        <p className="text-xs text-secondary mt-0.5">Qty: {item.quantity} × LKR {Number(item.price).toFixed(2)}</p>
                      </div>
                      <p className="font-bold text-accent text-sm">LKR {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-accent/15 pt-4 flex justify-between items-center">
                <span className="font-bold text-dark">Total Amount</span>
                <span className="font-playfair text-2xl font-bold text-accent">
                  LKR {selectedOrder.orderedItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-primary/30 px-6 py-4 flex justify-end">
              <button onClick={closeModals} className="px-6 py-2.5 bg-accent-gradient text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-accent/30 transition-all duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModalVisible && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModals}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#1a1008] text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="font-playfair text-xl font-bold">Update Order</h2>
              <button onClick={closeModals} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark text-sm"
                >
                  {["preparing", "cancelled", "delivered", "completed", "paused", "pended"].map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Admin Notes</label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark text-sm resize-none"
                  placeholder="Optional internal notes..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={closeModals} className="flex-1 py-2.5 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={handleUpdate} className="flex-1 py-2.5 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 text-sm transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}