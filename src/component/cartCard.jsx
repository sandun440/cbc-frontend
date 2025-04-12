import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";
import toast from "react-hot-toast";

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
    refresh?.(); // trigger cart update
  }

  if (!loaded) {
    return (
      <tr>
        <td colSpan={readOnly ? 6 : 7} className="text-center py-4">
          Loading...
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-accent hover:text-white text-center">
      <td>
        <img
          src={product?.images?.[0]}
          alt={product?.productName}
          className="w-[90px] h-[90px] object-cover mx-auto"
        />
      </td>
      <td>{product?.productName}</td>
      <td>{productId}</td>
      <td>{qty}</td>
      <td>LKR. {product?.lastPrice.toFixed(2)}</td>
      <td>LKR. {(product?.lastPrice * qty).toFixed(2)}</td>
      {!readOnly && (
        <td>
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </td>
      )}
    </tr>
  );
}
