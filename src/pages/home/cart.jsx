import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../component/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [refresh, setRefresh] = useState(false); // ✅ Trigger re-render

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
  }, [refresh]); // ✅ Runs whenever 'refresh' changes

  function onOrderCheckoutClick() {
    navigate("/shipping", {
      state: {
        items: loadCart(),
      },
    });
  }

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-end">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map(item => (
                <CartCard
                  key={item.productId}
                  productId={item.productId}
                  qty={item.qty}
                  refresh={() => setRefresh(!refresh)} // ✅ Pass trigger to child
                />
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="w-[400px] flex flex-col items-center mt-6">
        <h1 className="text-3xl font-bold text-accent">Total: LKR. {labeledTotal.toFixed(2)}</h1>
        <h1 className="text-3xl font-bold text-accent">Discount: LKR. {total.toFixed(2)}</h1>
        <h1 className="text-3xl font-bold text-accent">Grand Total: LKR. {(labeledTotal - total).toFixed(2)}</h1>
        <button onClick={onOrderCheckoutClick} className="bg-accent hover:bg-accent-light hover:text-black text-white p-2 rounded-lg w-[300px] mb-4">Checkout</button>
      </div>
    </div>
  );
}
