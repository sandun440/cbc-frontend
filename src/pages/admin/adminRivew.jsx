import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!reviewsLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
        .then((res) => { setReviews(res.data); setReviewsLoaded(true); })
        .catch(() => toast.error("Failed to load reviews"));
    }
  }, [reviewsLoaded]);

  const handleDelete = (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    const token = localStorage.getItem("token");
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => { toast.success("Review deleted"); setReviewsLoaded(false); })
    .catch(() => toast.error("Failed to delete review"));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-dark">Reviews</h2>
        <p className="text-secondary text-sm mt-1">{reviews.length} customer reviews</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
        {reviewsLoaded ? (
          reviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1a1008] text-white text-xs uppercase tracking-wider">
                    <th className="px-5 py-4 text-left">Reviewer</th>
                    <th className="px-5 py-4 text-left">Product ID</th>
                    <th className="px-5 py-4 text-left">Review</th>
                    <th className="px-5 py-4 text-center">Rating</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {reviews.map((review) => (
                    <tr key={review.reviewId} className="hover:bg-primary/40 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {review.email?.[0]?.toUpperCase()}
                          </div>
                          <p className="text-sm font-medium text-dark">{review.email}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-secondary bg-gray-100 px-2 py-1 rounded-lg">
                          {review.productId}
                        </span>
                      </td>
                      <td className="px-5 py-4 max-w-[220px]">
                        <p className="text-secondary text-sm line-clamp-2 italic">
                          "{review.description || "No comment"}"
                        </p>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-base ${i < review.rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          review.isVisible ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        }`}>
                          {review.isVisible ? <><FaEye size={11} /> Visible</> : <><FaEyeSlash size={11} /> Hidden</>}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDelete(review.reviewId)}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200"
                            title="Delete"
                          >
                            <FaTrash size={13} />
                          </button>
                          <button
                            onClick={() => navigate("/admin/reviews/editReview", { state: { review } })}
                            className="w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-200"
                            title="Edit"
                          >
                            <FaPencil size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">⭐</p>
              <p className="font-playfair text-xl text-dark">No reviews yet</p>
              <p className="text-secondary text-sm mt-2">Customer reviews will appear here.</p>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}