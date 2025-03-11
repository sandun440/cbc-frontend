import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductForm() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageUrls, setImageUrls] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(){
        const altnames = alternativeNames.split(",");
        const imgUrls = imageUrls.split(",");

        const product = {
            productId : productId,
            productName : productName,
            atlNames : altnames,
            images : imgUrls,
            price : price,
            lastPrice : lastPrice,
            stock : stock,
            description : description
        }

        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:3000/api/products", product, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully");
        }catch(err){
            console.log(err);
        
    }
}


    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-300">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add Product
          </h1>
  
          <div className="space-y-4">
            {/* Product ID */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Product ID</label>
              <input 
                type="text" 
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
  
            {/* Product Name */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Product Name</label>
              <input 
                type="text" 
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
  
            {/* Alternative Names */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Alternative Names</label>
              <input 
                type="text" 
                placeholder="Enter alternative names"
                value={alternativeNames}
                onChange={(e) => setAlternativeNames(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
  
            {/* Image URLs */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Image URLs</label>
              <input 
                type="text" 
                placeholder="Enter image URLs (commas separated)"
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
  
            {/* Price and Last Price in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Price</label>
                <input 
                  type="number" 
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Last Price</label>
                <input 
                  type="number" 
                  placeholder="Enter last price"
                  value={lastPrice}
                  onChange={(e) => setLastPrice(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
                />
              </div>
            </div>
  
            {/* Stock */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Stock</label>
              <input 
                type="number" 
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
              />
            </div>
  
            {/* Description */}
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Description</label>
              <textarea 
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 h-24 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>
  
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  }
