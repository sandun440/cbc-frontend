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
          <div className="w-full flex flex-col lg:flex-row justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-800 lg:hidden">
              {product.productName}
            </h1>
            <p className="text-xl text-gray-600 lg:hidden">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  LKR.{product.price}
                </span>
              )}
              <span>{" LKR." + product.lastPrice}</span>
            </p>

            <div className="w-full h-full lg:w-[35%]">
              <ImageSlider images={product.images} />
            </div>

            <div className="w-full lg:w-[65%] h-full p-4">
              <h1 className="text-3xl font-bold text-gray-800 hidden lg:block">
                {product.productName}
              </h1>
              <h2 className="text-2xl font-bold text-gray-500">
                {product.altNames.join(" | ")}
              </h2>
              <p className="text-xl text-gray-600 hidden lg:block">
                {product.price > product.lastPrice && (
                  <span className="line-through text-red-500">
                    LKR.{product.price}
                  </span>
                )}
                <span>{" LKR." + product.lastPrice}</span>
              </p>
              <p className="text-lg text-gray-600 line-clamp-3 mb-4">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center mb-4">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 text-lg border rounded-l bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b text-lg">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 text-lg border rounded-r bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                className="bg-accent text-white p-2 rounded-lg"
                onClick={onAddtoCartClick}
              >
                Add to Cart
              </button>
              <button
                className="text-accent border mx-1 border-accent p-2 rounded-lg"
                onClick={onBuyNowClick}
              >
                Buy Now
              </button>
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
