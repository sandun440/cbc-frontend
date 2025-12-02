import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AdminUserDetails() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    if (!usersLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/customers")
        .then((res) => {
          setUsers(res.data);
          setUsersLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load users");
        });
    }
  }, [usersLoaded]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Manage Customers
          </h1>
          <p className="text-slate-600 mt-2 text-lg">View and control customer accounts</p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {usersLoaded ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white uppercase text-xs tracking-wider">
                    <th className="px-8 py-5 text-left font-semibold">First Name</th>
                    <th className="px-8 py-5 text-left font-semibold">Last Name</th>
                    <th className="px-8 py-5 text-left font-semibold">Email</th>
                    <th className="px-8 py-5 text-left font-semibold">Account Type</th>
                    <th className="px-8 py-5 text-center font-semibold">Status</th>
                    <th className="px-8 py-5 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 transition-all duration-200 group"
                    >
                      <td className="px-8 py-6 font-medium text-slate-800">
                        {user.firstName}
                      </td>
                      <td className="px-8 py-6 font-medium text-slate-800">
                        {user.lastName}
                      </td>
                      <td className="px-8 py-6 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.type}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span
                          className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                            user.isBlocked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button
                          onClick={() => {
                            navigate("/admin/customers/editUser", {
                              state: {
                                user: users.find((u) => u.email === user.email),
                              },
                            });
                          }}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transform hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg"
                          title="Edit User"
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
            <div className="flex items-center justify-center py-24">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-200 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>

        {/* Optional: Empty state */}
        {usersLoaded && users.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-xl font-medium">No customers found</p>
            <p className="mt-2">When customers sign up, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}