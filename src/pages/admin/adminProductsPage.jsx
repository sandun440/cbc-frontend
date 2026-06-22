import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProduct] = useState([]);
  const [productsloaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsloaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
        setProduct(res.data);
        setProductsLoaded(true);
      });
    }
  }, [productsloaded]);

  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-dark">Products</h2>
          <p className="text-secondary text-sm mt-1">{products.length} total products</p>
        </div>
        <Link
          to="/admin/products/addProducts"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent-gradient text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          <FaPlus size={14} /> Add Product
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
        {productsloaded ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1008] text-white text-xs uppercase tracking-wider">
                  <th className="px-5 py-4 text-left">Product ID</th>
                  <th className="px-5 py-4 text-left">Name</th>
                  <th className="px-5 py-4 text-center">Price</th>
                  <th className="px-5 py-4 text-center">Sale Price</th>
                  <th className="px-5 py-4 text-center">Stock</th>
                  <th className="px-5 py-4 text-left">Description</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-primary/40 transition-colors duration-150 group">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-secondary bg-gray-100 px-2 py-1 rounded-lg">
                        {product.productId}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-dark text-sm">{product.productName}</td>
                    <td className="px-5 py-4 text-center text-sm text-gray-400 line-through">
                      LKR {Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="font-bold text-emerald-600 text-sm">
                        LKR {Number(product.lastPrice).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 10 ? "bg-emerald-100 text-emerald-700" :
                        product.stock > 0 ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-secondary max-w-[200px] truncate">
                      {product.description}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="Delete"
                          onClick={() => {
                            if (!window.confirm("Delete this product?")) return;
                            const token = localStorage.getItem("token");
                            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`, {
                              headers: { Authorization: "Bearer " + token }
                            }).then(() => {
                              toast.success("Product deleted");
                              setProductsLoaded(false);
                            });
                          }}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                          <FaTrash size={13} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => navigate("/admin/products/editProduct", { state: { product } })}
                          className="w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200"
                        >
                          <FaPencil size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
