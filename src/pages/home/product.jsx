import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../component/Productcard";
import { FaSearch } from "react-icons/fa";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); //loaded, loading, error
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");
    if (query == "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <div className="w-full h-full pt-4 relative">
      <div className="w-full flex justify-center">
        <div className="relative w-1/2 ">
          <input
            type="text"
            className="w-full p-2 pl-10 z-900 border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Search Products"
            onChange={search}
            value={query}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent text-lg" />
        </div>
      </div>
      {loadingStatus == "loaded" && (
        <div className="w-full h-full  overflow-y-scroll flex flex-wrap justify-center pt-4 relative">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
      {loadingStatus == "loading" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32  border-2 border-gray-500 border-b-accent border-b-4"></div>
        </div>
      )}
    </div>
  );
}
