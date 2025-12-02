import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditReviewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state?.review;

  // Safe guard navigation if no review
  React.useEffect(() => {
    if (!review) {
      navigate("/admin/reviews");
    }
  }, [review, navigate]);

  if (!review) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold text-center tracking-tight">
              Edit Customer Review
            </h1>
            <p className="text-center mt-2 text-indigo-100">
              Manage visibility and review details
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 lg:p-10">
            <div className="space-y-7">
              {/* Reviewer Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reviewer Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={review.email || ""}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`${review.rating} / 5`}
                    disabled
                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl text-amber-800 font-bold text-lg text-center cursor-not-allowed"
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-7 h-7 ${i < review.rating ? "text-amber-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Review Visibility
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex items-center justify-center p-5 rounded-xl border-2 border-gray-300 cursor-pointer has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 transition-all">
                    <input
                      type="radio"
                      name="visibility"
                      value="visible"
                      defaultChecked={!review.isHidden}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium text-gray-800">Show</span>
                      <span className="text-xs text-gray-500">Publicly visible</span>
                    </div>
                  </label>

                  <label className="relative flex items-center justify-center p-5 rounded-xl border-2 border-gray-300 cursor-pointer has-[:checked]:border-rose-600 has-[:checked]:bg-rose-50 transition-all">
                    <input
                      type="radio"
                      name="visibility"
                      value="hidden"
                      defaultChecked={review.isHidden}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-rose-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-medium text-gray-800">Hide</span>
                      <span className="text-xs text-gray-500">Not visible</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Update Review
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
              >
                ← Back to Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}