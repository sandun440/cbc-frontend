import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-primary/40 text-dark text-sm transition-all duration-200";
const labelClass = "block text-xs font-semibold text-secondary mb-1.5 uppercase tracking-wide";

export default function EditUserForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;
  if (!user) { navigate("/admin/customers"); return null; }

  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [userType, setUserType] = useState(user.type);

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + user.email,
        { isBlocked, type: userType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User updated successfully");
      navigate("/admin/customers");
    } catch {
      toast.error("Failed to update user");
    }
  }

  return (
    <div className="max-w-md">
      <button onClick={() => navigate("/admin/customers")} className="flex items-center gap-2 text-secondary text-sm hover:text-accent transition-colors mb-5">
        <FaArrowLeft size={12} /> Back to Customers
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
        <div className="bg-[#1a1008] px-6 py-5">
          <h2 className="font-playfair text-xl font-bold text-white">Edit Customer</h2>
          <p className="text-white/50 text-xs mt-1">{user.email}</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4 bg-primary/50 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center text-white text-lg font-bold">
              {user.firstName?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-dark">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-secondary">{user.email}</p>
            </div>
          </div>

          {/* Email (read only) */}
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={user.email} disabled className={inputClass + " opacity-50 cursor-not-allowed bg-gray-100"} />
          </div>

          {/* User Type */}
          <div>
            <label className={labelClass}>User Type</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)} className={inputClass}>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* Blocked toggle */}
          <div className="flex items-center justify-between bg-primary/40 rounded-xl px-4 py-3">
            <div>
              <p className="font-semibold text-dark text-sm">Block Account</p>
              <p className="text-xs text-secondary mt-0.5">Blocked users cannot log in</p>
            </div>
            <button
              onClick={() => setIsBlocked(!isBlocked)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                isBlocked ? "bg-red-500" : "bg-gray-200"
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                isBlocked ? "translate-x-6" : "translate-x-0"
              }`} />
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => navigate("/admin/customers")} className="flex-1 py-3 border border-gray-200 text-secondary font-semibold rounded-xl hover:bg-gray-50 text-sm transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-accent-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 text-sm transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
