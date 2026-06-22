import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

export default function EditReviewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state?.review;

  React.useEffect(() => {
    if (!review) navigate("/admin/reviews");
  }, [review, navigate]);

  if (!review) return null;

  const [isVisible, setIsVisible] = useState(review.isVisible ?? !review.isHidden);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${review.reviewId}`,
        { isVisible },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review updated successfully");
      navigate("/admin/reviews");
    } catch {
      toast.error("Failed to update review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg">
      <button onClick={() => navigate("/admin/reviews")} className="flex items-center gap-2 text-secondary text-sm hover:text-accent transition-colors mb-5">
        <FaArrowLeft size={12} /> Back to Reviews
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1008] px-6 py-5">
          <h2 className="font-playfair text-xl font-bold text-white">Edit Review</h2>
          <p className="text-white/50 text-xs mt-1 font-mono">#{review.reviewId?.slice(-8)}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Reviewer Info */}
          <div className="flex items-center gap-3 bg-primary/50 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold">
              {review.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-dark text-sm">{review.email}</p>
              <p className="text-xs text-secondary">{review.productId}</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Rating</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < review.rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
              ))}
              <span className="ml-2 font-bold text-dark text-sm">{review.rating}/5</span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Review Text</p>
            <div className="bg-primary/40 rounded-xl p-4 text-secondary text-sm italic">
              "{review.description}"
            </div>
          </div>

          {/* Visibility Toggle */}
          <div>
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">Visibility</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsVisible(true)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  isVisible ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FaEye size={20} className={isVisible ? "text-emerald-600" : "text-gray-400"} />
                <span className={`font-semibold text-sm ${isVisible ? "text-emerald-700" : "text-gray-500"}`}>Visible</span>
                <span className="text-xs text-secondary">Show publicly</span>
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                  !isVisible ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FaEyeSlash size={20} className={!isVisible ? "text-rose-600" : "text-gray-400"} />
                <span className={`font-semibold text-sm ${!isVisible ? "text-rose-700" : "text-gray-500"}`}>Hidden</span>
                <span className="text-xs text-secondary">Not visible</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate("/admin/reviews")} className="flex-1 py-3 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
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