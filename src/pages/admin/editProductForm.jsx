import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";
import { FaArrowLeft } from "react-icons/fa";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm transition-all duration-200";
const labelClass = "block text-xs font-semibold text-secondary mb-1.5 uppercase tracking-wide";

export default function EditProductForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state?.product;
    if (!product) { navigate("/admin/products"); return null; }

    const altNames = product.altNames.join(",");
    const [productId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alternativeNames, setAlternativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit() {
        setIsSubmitting(true);
        try {
            const altnames = alternativeNames.split(",");
            let imgUrls = product.images;
            if (imageFiles.length > 0) {
                imgUrls = await Promise.all(Array.from(imageFiles).map((f) => uploadMediaToSupabase(f)));
            }
            const productData = { productId, productName, altNames: altnames, images: imgUrls, price, lastPrice, stock, description };
            const token = localStorage.getItem("token");
            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId, productData, {
                headers: { Authorization: "Bearer " + token }
            });
            navigate("/admin/products");
            toast.success("Product updated successfully");
        } catch {
            toast.error("Failed to update product");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-xl">
            <button onClick={() => navigate("/admin/products")} className="flex items-center gap-2 text-secondary text-sm hover:text-accent transition-colors mb-5">
                <FaArrowLeft size={12} /> Back to Products
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
                <div className="bg-[#1a1008] px-6 py-5">
                    <h2 className="font-playfair text-xl font-bold text-white">Edit Product</h2>
                    <p className="text-white/50 text-xs mt-1 font-mono">{product.productId}</p>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className={labelClass}>Product ID</label>
                        <input type="text" value={productId} disabled className={inputClass + " opacity-50 cursor-not-allowed bg-gray-100"} />
                    </div>
                    <div>
                        <label className={labelClass}>Product Name</label>
                        <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Alternative Names <span className="text-secondary/50 normal-case">(comma separated)</span></label>
                        <input type="text" placeholder="name1, name2" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Replace Images <span className="text-secondary/50 normal-case">(leave empty to keep current)</span></label>
                        <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(e.target.files)} className={inputClass + " cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent/10 file:text-accent"} />
                        {product.images?.length > 0 && (
                            <div className="flex gap-2 mt-2">
                                {product.images.slice(0, 3).map((img, i) => (
                                    <img key={i} src={img} className="w-12 h-12 object-cover rounded-lg ring-1 ring-gray-200" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Price (LKR)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Sale Price (LKR)</label>
                            <input type="number" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Stock Quantity</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={inputClass + " resize-none"} />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button onClick={() => navigate("/admin/products")} className="flex-1 py-3 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 text-sm transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
