import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditReviewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state.review;
  console.log(review);
  if (review == null) {
    navigate("/admin/reviews");
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Review
        </h1>
        <div className="w-full max-w-3xl bg-white/30 backdrop-blur-2xl rounded-lg shadow-lg p-6">
          <div className="mb-4">
            {/* Reviewer Email */}
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 mt-4">
              Reviewer Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={review.email}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent"
            />

            {/* Rate */}
            <label htmlFor="rate" className="block text-gray-700 font-semibold mb-2 mt-4">
              Rate
            </label>
            <input
              type="text"
              id="rate"
              name="rate"
              value={review.rating}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-accent"
            />

            {/* Visibility Radio Buttons */}
            <div className="mb-4 mt-4">
              <span className="block text-gray-700 font-semibold mb-2">Visibility</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="visible"
                    defaultChecked
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Show</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="hidden"
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Hide</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-10"
            >
              Update Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
