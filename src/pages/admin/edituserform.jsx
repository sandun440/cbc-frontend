import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditUserForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state.user;

  if (!user) {
    navigate("/admin/customers");
    return null;
  }

  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [userType, setUserType] = useState(user.type);

  async function handleSubmit() {

    const userChange = {
      isBlocked: isBlocked,
      type: userType,
    };


    const token = localStorage.getItem("token");
    try {
      await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/users/"+user.email, userChange,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully");
      navigate("/admin/customers");
    } catch (err) {
      toast.error("Failed to update user");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit User</h1>
        
        <div className="space-y-4">
          {/* User Email (Read-only) */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Email</label>
            <input 
              type="email" 
              value={user.email} 
              disabled 
              className="w-full p-2 border border-gray-400 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          
          {/* User Type Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          
          {/* Blocked Status Checkbox */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={isBlocked} 
              onChange={() => setIsBlocked(!isBlocked)}
              className="w-5 h-5 mr-2"
            />
            <label className="text-gray-600 font-medium">Blocked</label>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
}
