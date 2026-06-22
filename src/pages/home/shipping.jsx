import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../../component/cartCard";
import { FaUser, FaMapMarkerAlt, FaPhone, FaShoppingBag, FaArrowLeft, FaLock } from "react-icons/fa";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200";
const labelClass = "block text-xs font-semibold text-secondary uppercase tracking-wide mb-1.5 flex items-center gap-1.5";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;

  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    if (!cart) {
      toast.error("No items received");
      navigate("/cart");
      return;
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data.total != null) {
          setTotal(res.data.total);
          setLabeledTotal(res.data.labeledTotal);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch order quote. Please try again.");
        console.error(err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) { toast.error("Please enter your name."); return false; }
    if (!address.trim()) { toast.error("Please enter your address."); return false; }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    setIsPlacing(true);
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        { orderedItems: cart, name, address, phone },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success("Order placed successfully! 🎉");
        navigate("/orders");
      })
      .catch((err) => {
        toast.error("Failed to place order. Please try again.");
        console.error(err);
        setIsPlacing(false);
      });
  }

  if (!cart) return null;

  const savings = labeledTotal - total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cream to-[#f5e8d8] py-10 px-4">
      {/* Decorative blobs */}
      <div className="fixed top-20 right-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-accent-dark/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-secondary text-sm hover:text-accent transition-colors mb-6"
        >
          <FaArrowLeft size={12} /> Back to Cart
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-1">Almost There!</p>
          <h1 className="font-playfair text-3xl font-bold text-dark">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: Shipping Form ── */}
          <div className="flex-1 space-y-5">
            {/* Shipping Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <FaShoppingBag className="text-accent" size={14} />
                </div>
                <h2 className="font-playfair text-lg font-bold text-dark">Shipping Details</h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className={labelClass}>
                    <FaUser size={10} className="text-accent" /> Full Name
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className={labelClass}>
                    <FaMapMarkerAlt size={10} className="text-accent" /> Delivery Address
                  </label>
                  <textarea
                    className={inputClass + " resize-none"}
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="No. 01, Main Street, Colombo 03"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    <FaPhone size={10} className="text-accent" /> Phone Number
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0771234567"
                    maxLength={10}
                  />
                  <p className="text-xs text-secondary/60 mt-1">Enter 10-digit mobile number</p>
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-playfair text-lg font-bold text-dark">Order Items</h2>
                <p className="text-xs text-secondary mt-0.5">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary/50 border-b border-gray-50">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wide">Image</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wide">Name</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wide">ID</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wide">Qty</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wide">Price</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-secondary uppercase tracking-wide">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cart.map((item) => (
                      <CartCard
                        key={item.productId}
                        productId={item.productId}
                        qty={item.qty}
                        readOnly={true}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full lg:w-[320px] space-y-4">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 p-6 sticky top-24">
              <h2 className="font-playfair text-xl font-bold text-dark mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-medium text-dark">LKR {labeledTotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Savings</span>
                    <span className="font-semibold">− LKR {savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-secondary">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-semibold">Free</span>
                </div>

                <div className="h-[1px] bg-gray-100 my-1" />

                <div className="flex justify-between font-bold text-base">
                  <span className="text-dark">Total</span>
                  <span className="font-playfair text-xl text-accent">
                    LKR {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Savings Banner */}
              {savings > 0 && (
                <div className="mt-4 bg-emerald-50 rounded-xl px-4 py-3 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                  🎉 You're saving LKR {savings.toFixed(2)} on this order!
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={createOrder}
                disabled={isPlacing}
                className="w-full mt-6 py-3.5 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <FaLock size={12} /> Place Order
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-secondary/60">
                <span className="flex items-center gap-1">🔒 Secure</span>
                <span>·</span>
                <span className="flex items-center gap-1">🚚 Free Delivery</span>
                <span>·</span>
                <span className="flex items-center gap-1">↩️ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
