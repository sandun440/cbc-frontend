import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    if (!reviewsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
        .then((res) => {
          setReviews(res.data);
          setReviewsLoaded(true);
        })
        .catch(() => toast.error("Failed to load reviews"));
    }
  }, [reviewsLoaded]);

  const navigate = useNavigate();

  const handleDelete = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Review deleted successfully");
        setReviewsLoaded(false); // Trigger reload
      })
      .catch(() => toast.error("Failed to delete review"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-lg text-slate-600 mt-3">
            Manage, moderate, and control all product reviews
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {reviewsLoaded ? (
            reviews.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white uppercase text-xs tracking-wider">
                      <th className="px-6 py-5 text-left font-bold">ID</th>
                      <th className="px-6 py-5 text-left font-bold">Reviewer</th>
                      <th className="px-6 py-5 text-left font-bold">Product ID</th>
                      <th className="px-6 py-5 text-left font-bold">Review Text</th>
                      <th className="px-6 py-5 text-center font-bold">Rating</th>
                      <th className="px-6 py-5 text-center font-bold">Status</th>
                      <th className="px-6 py-5 text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr
                        key={review.reviewId}
                        className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                      >
                        <td className="px-6 py-5 font-mono text-sm text-gray-600">
                          #{review.reviewId.slice(-6)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {review.email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{review.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-medium text-gray-700">
                          {review.productId}
                        </td>
                        <td className="px-6 py-5 max-w-md">
                          <p className="text-gray-700 line-clamp-2">
                            {review.description || "<No comment>"}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? "text-amber-500" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 font-bold text-gray-700">
                              {review.rating}/5
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide ${
                              review.isVisible
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {review.isVisible ? (
                              <>
                                <FaEye size={14} /> Visible
                              </>
                            ) : (
                              <>
                                <FaEyeSlash size={14} /> Hidden
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleDelete(review.reviewId)}
                              className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transform hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              title="Delete Review"
                            >
                              <FaTrash size={16} />
                            </button>
                            <button
                              onClick={() =>
                                navigate("/admin/reviews/editReview", {
                                  state: { review },
                                })
                              }
                              className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 transform hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                              title="Edit Review"
                            >
                              <FaPencil size={16} />
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
                <div className="text-6xl mb-4">No reviews yet</div>
                <p className="text-xl text-gray-500">
                  Customer reviews will appear here once submitted.
                </p>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center py-32">
              <div className="relative">
                <div className="w-24 h-24 border-8 border-gray-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-24 h-24 border-8 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}