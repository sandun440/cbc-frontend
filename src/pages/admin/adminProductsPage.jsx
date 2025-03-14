import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProduct] = useState([]);
  const [productsloaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if(!productsloaded){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then((res) => {
        setProduct(res.data);
        setProductsLoaded(true);
      });
    }
  }, [productsloaded]);

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Link to={"/admin/products/addProducts"} className="absolute right-[25px] bottom-[25px] text-[25px] border-[2px] border-[#3b82f6] text-[#3b82f6] p-5 rounded-xl hover:rounded-full" ><FaPlus/></Link>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Products Page</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {
            productsloaded?<div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="px-6 py-3">Product ID</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Last Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{product.productId}</td>
                    <td className="px-6 py-4 font-semibold">{product.productName}</td>
                    <td className="px-6 py-4 text-green-600 font-bold">${product.price}</td>
                    <td className="px-6 py-4 line-through text-red-500">${product.lastPrice}</td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">{product.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button className="text-red-500 hover:text-red-700 p-2" 
                      title="delete"
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`, {
                          headers: {
                            Authorization: "Bearer " + token
                          }
                        }).then(res => {
                          toast.success("Product deleted successfully")
                          setProductsLoaded(false);
                        })
                      }}>
                        <FaTrash size={16} />
                      </button>
                      
                      <button className="text-blue-500 hover:text-blue-700 p-2"
                      title="edit"
                      onClick={()=>{
                        //move to editProduct page
                        navigate("/admin/products/editProduct", {state : {product : product}});
                      }}
                      >
                        <FaPencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>:<div className="w-full flex justify-between items-center">
            <div className="w-[60px] h-[60px] border-[4px] border-gray-100  border-b-[#3b82f6] rounded-full animate-spin"></div>
          </div>
          }
          
        </div>
      </div>
    </div>
  );
}
