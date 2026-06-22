import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminUserDetails() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usersLoaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/customers")
        .then((res) => { setUsers(res.data); setUsersLoaded(true); })
        .catch(() => toast.error("Failed to load users"));
    }
  }, [usersLoaded]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-dark">Customers</h2>
        <p className="text-secondary text-sm mt-1">{users.length} registered customers</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-accent/8 overflow-hidden">
        {usersLoaded ? (
          users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1a1008] text-white text-xs uppercase tracking-wider">
                    <th className="px-5 py-4 text-left">Customer</th>
                    <th className="px-5 py-4 text-left">Email</th>
                    <th className="px-5 py-4 text-center">Type</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-primary/40 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {user.firstName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-dark text-sm">{user.firstName} {user.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-secondary text-sm">{user.email}</td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex px-2.5 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                          {user.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isBlocked ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => navigate("/admin/customers/editUser", { state: { user } })}
                          className="w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white flex items-center justify-center mx-auto transition-all duration-200"
                          title="Edit User"
                        >
                          <FaPencil size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-playfair text-xl text-dark">No customers yet</p>
              <p className="text-secondary text-sm mt-2">Customers will appear here after signup.</p>
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