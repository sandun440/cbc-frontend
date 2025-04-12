import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../component/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

// Star rating component
function StarRating({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch product and reviews when component mounts
  useEffect(() => {
    // Fetch product details
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        if (res.data == null) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");

          // Fetch reviews for the product
          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + productId)
            .then((reviewsRes) => {
              setReviews(reviewsRes.data); // Set reviews to state
              console.log(reviewsRes.data);
            })
            .catch((err) => {
              console.error("Error fetching reviews:", err);
              setReviews([]); // Set reviews as empty if there's an error
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setStatus("not-found");
      });
  }, [productId]);

  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQty() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function onAddtoCartClick() {
    addToCart(product.productId, quantity);
    toast.success(`${product.productId} x${quantity} added to cart`);
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: quantity,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)]">
      {status === "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-2 border-b-4 border-gray-300 border-b-accent"></div>
        </div>
      )}

      {status === "not-found" && <ProductNotFound />}

      {status === "found" && (
        <>
          {/* Product Details Section */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center px-4">
            <div className="w-full lg:w-1/3">
              <ImageSlider images={product.images} />
            </div>
            <div className="w-full lg:w-2/3 p-4">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.productName}</h1>
              <p className="text-lg sm:text-xl">{product.description}</p>
              <div className="flex flex-col sm:flex-row items-center">
                <button className="bg-accent text-white p-2 rounded-lg w-full sm:w-auto" onClick={onAddtoCartClick}>Add to Cart</button>
                <button className="text-accent border p-2 rounded-lg w-full sm:w-auto" onClick={onBuyNowClick}>Buy Now</button>
              </div>
            </div>
          </div>

          {/* Centered Customer Reviews Section */}
          <div className="w-full flex justify-center mt-10 px-4">
            <div className="w-full max-w-3xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Customer Reviews
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-700">
                          {review.email}
                        </p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-600 text-sm">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{review.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
