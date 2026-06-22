import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../component/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loaded = loadCart();
    setCart(loaded);

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
      orderedItems: loaded,
    }).then((res) => {
      if (res.data.total != null) {
        setTotal(res.data.total);
        setLabeledTotal(res.data.labeledTotal);
      }
    });
  }, [refresh]);

  function onOrderCheckoutClick() {
    navigate("/shipping", {
      state: { items: loadCart() },
    });
  }

  const savings = labeledTotal - total;

  return (
    <div className="min-h-screen bg-primary px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <FaShoppingBag className="text-accent" />
          </div>
          <div>
            <h1 className="font-playfair text-2xl font-bold text-dark">Shopping Cart</h1>
            <p className="text-secondary text-sm">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
              <FaShoppingBag className="text-accent/50" size={32} />
            </div>
            <p className="font-playfair text-2xl text-dark">Your cart is empty</p>
            <p className="text-secondary text-sm">Explore our products and add something beautiful!</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-2 px-6 py-2.5 bg-accent-gradient text-white font-semibold rounded-full hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Table */}
            <div className="flex-1 bg-white rounded-2xl card-shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-primary/50">
                      <th className="text-left px-5 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Product</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">ID</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Qty</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Price</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Total</th>
                      <th className="text-center px-4 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cart.map((item) => (
                      <CartCard
                        key={item.productId}
                        productId={item.productId}
                        qty={item.qty}
                        refresh={() => setRefresh(!refresh)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[320px] space-y-4">
              <div className="bg-white rounded-2xl card-shadow p-6">
                <h2 className="font-playfair text-xl font-bold text-dark mb-5">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-medium text-dark">LKR {labeledTotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">− LKR {savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-[1px] bg-gray-100 my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-dark">Grand Total</span>
                    <span className="text-accent font-playfair text-lg">LKR {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onOrderCheckoutClick}
                  className="w-full mt-6 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Checkout <FaArrowRight size={14} />
                </button>
              </div>

              <button
                onClick={() => navigate("/products")}
                className="w-full py-2.5 text-accent font-medium text-sm border border-accent/30 rounded-xl hover:bg-accent/5 transition-all duration-200"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
