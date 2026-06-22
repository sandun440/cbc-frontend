import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../component/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";
import { FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";

// Star rating component
function StarRating({ rating, interactive = false, onRate }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          onClick={() => interactive && onRate && onRate(i + 1)}
          className={`text-xl transition-colors ${
            interactive ? "cursor-pointer hover:text-amber-400" : ""
          } ${i < rating ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </span>
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
            .then((reviewsRes) => setReviews(reviewsRes.data))
            .catch(() => setReviews([]));
        }
      })
      .catch(() => setStatus("not-found"));
  }, [productId]);

  function increaseQty() { setQuantity((prev) => prev + 1); }
  function decreaseQty() { setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); }

  function onAddtoCartClick() {
    addToCart(product.productId, quantity);
    toast.success(`${product.productName} x${quantity} added to cart`);
  }

  function onBuyNowClick() {
    navigate("/shipping", {
      state: { items: [{ productId: product.productId, qty: quantity }] },
    });
  }

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) { toast.error("You must be logged in to submit a review."); return; }
    if (!newReview.rating || !newReview.description.trim()) {
      toast.error("Please provide a rating and description.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { productId: product.productId, rating: newReview.rating, description: newReview.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review submitted successfully!");
      setReviews((prev) => [...prev, response.data]);
      setNewReview({ rating: 0, description: "" });
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="w-full min-h-screen bg-primary">
      {/* Loading */}
      {status === "loading" && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-14 h-14 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
        </div>
      )}

      {status === "not-found" && <ProductNotFound />}

      {status === "found" && (
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Product Info */}
          <div className="bg-white rounded-3xl card-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="w-full lg:w-[45%] p-4">
                <ImageSlider images={product.images} />
              </div>

              {/* Details */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">
                  {product.productId}
                </p>
                <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-dark mb-3">
                  {product.productName}
                </h1>

                {avgRating && (
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={Math.round(avgRating)} />
                    <span className="text-sm text-secondary">({reviews.length} reviews)</span>
                  </div>
                )}

                <p className="text-secondary leading-relaxed mb-6">{product.description}</p>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-playfair text-3xl font-bold text-accent">
                    LKR {product.lastPrice.toFixed(2)}
                  </span>
                  {product.lastPrice < product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      LKR {product.price.toFixed(2)}
                    </span>
                  )}
                  {product.lastPrice < product.price && (
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Save LKR {(product.price - product.lastPrice).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-semibold text-secondary">Quantity:</span>
                  <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={decreaseQty}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-200 font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold text-dark text-sm">{quantity}</span>
                    <button
                      onClick={increaseQty}
                      className="w-10 h-10 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-200 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                    onClick={onAddtoCartClick}
                  >
                    <FaShoppingCart size={16} /> Add to Cart
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-white transition-all duration-300 text-sm"
                    onClick={onBuyNowClick}
                  >
                    <FaBolt size={14} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <FaStar className="text-amber-400" size={20} />
              <h2 className="font-playfair text-2xl font-bold text-dark">Customer Reviews</h2>
              {reviews.length > 0 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                  {avgRating} avg
                </span>
              )}
            </div>

            {/* Existing Reviews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-2xl p-5 card-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold">
                          {review.email?.charAt(0)?.toUpperCase()}
                        </div>
                        <p className="font-semibold text-sm text-dark">{review.email}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs text-secondary/60 mb-2">
                      {new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                    <p className="text-sm text-secondary leading-relaxed italic">"{review.description}"</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl card-shadow">
                  <p className="text-4xl mb-3">✨</p>
                  <p className="font-playfair text-xl text-dark mb-1">No reviews yet</p>
                  <p className="text-sm text-secondary">Be the first to share your experience!</p>
                </div>
              )}
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-2xl card-shadow p-8">
              <h3 className="font-playfair text-xl font-bold text-dark mb-5">Write a Review</h3>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-secondary mb-2">Your Rating</label>
                <StarRating
                  rating={newReview.rating}
                  interactive
                  onRate={(r) => setNewReview((prev) => ({ ...prev, rating: r }))}
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-secondary mb-2">Your Review</label>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl bg-primary/40 text-dark placeholder-gray-400 text-sm resize-none transition-all duration-200"
                  rows="4"
                  placeholder="Share your honest experience with this product..."
                  value={newReview.description}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <button
                className="px-8 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleReviewSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
