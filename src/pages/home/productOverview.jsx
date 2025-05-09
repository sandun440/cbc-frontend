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
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [newReview, setNewReview] = useState({ rating: 0, description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        if (res.data == null) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");

          axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/" + productId)
            .then((reviewsRes) => {
              setReviews(reviewsRes.data);
            })
            .catch((err) => {
              console.error("Error fetching reviews:", err);
              setReviews([]);
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

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    if (!newReview.rating || !newReview.description.trim()) {
      toast.error("Please provide a rating and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        {
          productId: product.productId,
          rating: newReview.rating,
          description: newReview.description,
          email: localStorage.getItem("email"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review submitted successfully!");
      setReviews((prev) => [...prev, response.data]);
      setNewReview({ rating: 0, description: "" });
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Product Details */}
          <div className="w-full flex flex-col lg:flex-row justify-center items-center px-4">
            <div className="w-full lg:w-1/3">
              <ImageSlider images={product.images} />
            </div>
            <div className="w-full lg:w-2/3 p-4">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.productName}</h1>
              <p className="text-lg sm:text-xl">{product.description}</p>

              {/* Quantity and Buttons (Stacked) */}
              <div className="flex flex-col items-start space-y-4 mt-4">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decreaseQty}
                    className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    className="bg-gray-200 px-3 py-1 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Buttons under quantity */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
                  <button
                    className="bg-accent text-white p-2 rounded-lg w-full sm:w-auto"
                    onClick={onAddtoCartClick}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="text-accent border p-2 rounded-lg w-full sm:w-auto"
                    onClick={onBuyNowClick}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
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

              {/* Add Review */}
              <div className="mt-6 bg-accent-light rounded-2xl p-5 mb-3">
                <h3 className="text-xl font-bold mb-2">Add Your Review</h3>
                <div className="flex items-center mb-4">
                  <label className="mr-2 font-semibold">Rating:</label>
                  <div className="flex space-x-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`cursor-pointer ${
                          i < newReview.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() =>
                          setNewReview((prev) => ({ ...prev, rating: i + 1 }))
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  rows="4"
                  placeholder="Write your review here..."
                  value={newReview.description}
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
                <button
                  className="bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-light"
                  onClick={handleReviewSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
