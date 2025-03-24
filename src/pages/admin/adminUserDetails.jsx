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
          console.log(res.data);
          setUsers(res.data);
          setUsersLoaded(true);
        });
    }
  }, [usersLoaded]);

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Users Page
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {usersLoaded ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-left">
                    <th className="px-6 py-3">First Name</th>
                    <th className="px-6 py-3">last Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3 text-center">Block/Unblock</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4 font-semibold">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.type}</td>
                      <td className="px-6 py-4 text-center">
                        {user.isBlocked ? "Blocked" : "Normal"}
                      </td>
                      <td className="px-6 py-4 flex justify-center space-x-2">

                        <button
                          className="text-blue-500 hover:text-blue-700 p-2"
                          title="edit"
                          onClick={() => {
                            // Move to editUser page
                            navigate("/admin/customers/editUser", {
                              state: { user: users.find(u => u.email === user.email)  },
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
            <div className="w-full flex justify-between items-center">
              <div className="w-[60px] h-[60px] border-[4px] border-gray-100 border-b-[#3b82f6] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
