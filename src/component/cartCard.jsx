import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function CartCard({ productId, qty, refresh, readOnly = false }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          setLoaded(true);
        } else {
          deleteItem(productId);
          toast.error("Product not found. Removed from cart.");
          refresh?.();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load product.");
      });
  }, [productId, refresh]);

  function handleRemove() {
    deleteItem(productId);
    toast.success("Item removed from cart");
    refresh?.();
  }

  if (!loaded) {
    return (
      <tr>
        <td colSpan={readOnly ? 5 : 6} className="py-6 text-center">
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="group hover:bg-primary/60 transition-colors duration-200">
      {/* Image */}
      <td className="px-5 py-4">
        <img
          src={product?.images?.[0]}
          alt={product?.productName}
          className="w-16 h-16 object-cover rounded-xl ring-1 ring-gray-100"
        />
      </td>

      {/* Name */}
      <td className="px-4 py-4">
        <p className="font-semibold text-dark text-sm">{product?.productName}</p>
      </td>

      {/* ID */}
      <td className="px-4 py-4 text-center">
        <span className="text-xs text-secondary/60 bg-gray-100 px-2 py-1 rounded-full">{productId}</span>
      </td>

      {/* Qty */}
      <td className="px-4 py-4 text-center">
        <span className="w-8 h-8 bg-accent/10 text-accent font-bold text-sm rounded-full inline-flex items-center justify-center">
          {qty}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-center text-sm font-medium text-secondary">
        LKR {product?.lastPrice.toFixed(2)}
      </td>

      {/* Total */}
      <td className="px-4 py-4 text-center font-bold text-accent text-sm">
        LKR {(product?.lastPrice * qty).toFixed(2)}
      </td>

      {/* Action */}
      {!readOnly && (
        <td className="px-4 py-4 text-center">
          <button
            onClick={handleRemove}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center mx-auto transition-all duration-200"
          >
            <FaTrash size={12} />
          </button>
        </td>
      )}
    </tr>
  );
}
