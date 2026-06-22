import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";
import { FaArrowLeft } from "react-icons/fa";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200";
const labelClass = "block text-xs font-semibold text-secondary mb-1.5 uppercase tracking-wide";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit() {
        setIsSubmitting(true);
        try {
            const altnames = alternativeNames.split(",");
            const promisesArray = Array.from(imageFiles).map((f) => uploadMediaToSupabase(f));
            const imgUrls = await Promise.all(promisesArray);

            const product = { productId, productName, altNames: altnames, images: imgUrls, price, lastPrice, stock, description };
            const token = localStorage.getItem("token");
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                headers: { Authorization: "Bearer " + token }
            });
            navigate("/admin/products");
            toast.success("Product added successfully");
        } catch (err) {
            toast.error("Failed to add product");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-xl">
            {/* Back */}
            <button onClick={() => navigate("/admin/products")} className="flex items-center gap-2 text-secondary text-sm hover:text-accent transition-colors mb-5">
                <FaArrowLeft size={12} /> Back to Products
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
                {/* Header */}
                <div className="bg-[#1a1008] px-6 py-5">
                    <h2 className="font-playfair text-xl font-bold text-white">Add New Product</h2>
                    <p className="text-white/50 text-xs mt-1">Fill in the details below to add a product</p>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className={labelClass}>Product ID</label>
                        <input type="text" placeholder="e.g. CBC-001" value={productId} onChange={(e) => setProductId(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Product Name</label>
                        <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Alternative Names <span className="text-secondary/50 normal-case">(comma separated)</span></label>
                        <input type="text" placeholder="name1, name2, name3" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Product Images</label>
                        <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(e.target.files)} className={inputClass + " cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent/10 file:text-accent"} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Price (LKR)</label>
                            <input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Sale Price (LKR)</label>
                            <input type="number" placeholder="0.00" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Stock Quantity</label>
                        <input type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea placeholder="Product description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={inputClass + " resize-none"} />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button onClick={() => navigate("/admin/products")} className="flex-1 py-3 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
