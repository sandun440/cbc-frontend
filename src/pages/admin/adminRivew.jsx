import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    if (!reviewsLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL +"/api/reviews")
        .then((res) => {
          console.log(res.data);
          setReviews(res.data);
          setReviewsLoaded(true);
        });
    }
  }, [reviewsLoaded]);

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Reviews Page
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {reviewsLoaded ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="px-6 py-3">Review Id</th>
                    <th className="px-6 py-3">Reviewer Email</th>
                    <th className="px-6 py-3">Review</th>
                    <th className="px-6 py-3">Rating</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4 font-bold">{review.reviewId}</td>
                      <td className="px-6 py-4 font-semibold">
                        {review.email}
                      </td>
                      <td className="px-6 py-4">{review.description}</td>
                      <td className="px-6 py-4"><span className="font-semibold text-accent">{review.rating}</span> / 5</td>
                      <td className="px-6 py-4 flex justify-center space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700 p-2"
                          title="Edit"
                          onClick={() => {
                            navigate("/admin/reviews/editReview", {
                              state: { review },
                            });
                          }}
                        >
                          <FaPencil size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <div className="w-[60px] h-[60px] border-[4px] border-gray-100 border-b-[#3b82f6] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
