import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsClipboardData, BsPeople } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductFrom";
import EditProductForm from "./admin/editProductForm";
import AdminOrdersPage from "./admin/adminOrderPage";
import axios from "axios";
import toast from "react-hot-toast";
import AdminUserDetails from "./admin/adminUserDetails";
import AdminDashboardPage from "./admin/adminDashboard";
import EditUserForm from "./admin/edituserform";
import NotFound from "./NotFound";
import AdminRivewPage from "./admin/adminRivew";
import EditReview from "./admin/editreviewform";

export default function AdminHomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => {
            if (res.data.type !== "admin") {
                toast.error("You are not authorized to access this page.");
                navigate("/login");
            } else {
                setUser(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch user data.");
            navigate("/login");
        });
    }, [navigate]);

    return (
        <div className="flex min-h-screen bg-blue-200">
            {/* Fixed Sidebar - 20% width, no scroll */}
            <div className="fixed inset-y-0 left-0 w-[20%] bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center z-50 overflow-y-auto">
                <h1 className="font-bold text-3xl text-amber-100 bg-orange-300 w-full p-4 h-20 flex justify-center items-center backdrop-blur-sm">
                    Crystal Beauty Clear
                </h1>
                <h2 className="font-semibold text-2xl text-blue-50 mt-4 mb-8">Admin Panel</h2>

                <nav className="w-full flex-1 px-4">
                    <Link to="/admin/dashboard" className="flex items-center justify-center space-x-4 py-4 text-white hover:bg-white/20 hover:text-cyan-100 transition rounded-l-full mx-4">
                        <BsGraphUp className="text-2xl" /> <span className="text-lg">Dashboard</span>
                    </Link>
                    <Link to="/admin/products" className="flex items-center justify-center space-x-4 py-4 text-white hover:bg-white/20 hover:text-cyan-100 transition rounded-l-full mx-4">
                        <BsBoxSeam className="text-2xl" /> <span className="text-lg">Products</span>
                    </Link>
                    <Link to="/admin/orders" className="flex items-center justify-center space-x-4 py-4 text-white hover:bg-white/20 hover:text-cyan-100 transition rounded-l-full mx-4">
                        <BsClipboardData className="text-2xl" /> <span className="text-lg">Orders</span>
                    </Link>
                    <Link to="/admin/customers" className="flex items-center justify-center space-x-4 py-4 text-white hover:bg-white/20 hover:text-cyan-100 transition rounded-l-full mx-4">
                        <BsPeople className="text-2xl" /> <span className="text-lg">Customers</span>
                    </Link>
                    <Link to="/admin/reviews" className="flex items-center justify-center space-x-4 py-4 text-white hover:bg-white/20 hover:text-cyan-100 transition rounded-l-full mx-4">
                        <MdStars className="text-2xl" /> <span className="text-lg">Reviews</span>
                    </Link>
                </nav>
            </div>

            {/* Main Content - Starts after sidebar, scrolls independently */}
            <div className="ml-[20%] w-[80%] min-h-screen bg-blue-100">
                {user ? (
                    <div className="p-8">
                        <Routes>
                            <Route path="/dashboard" element={<AdminDashboardPage />} />
                            <Route path="/products" element={<AdminProductsPage />} />
                            <Route path="/products/addProducts" element={<AddProductForm />} />
                            <Route path="/products/editProduct/*" element={<EditProductForm />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/customers" element={<AdminUserDetails />} />
                            <Route path="/customers/editUser/*" element={<EditUserForm />} />
                            <Route path="/reviews" element={<AdminRivewPage />} />
                            <Route path="/reviews/editReview/*" element={<EditReview />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-600"></div>
                    </div>
                )}
            </div>
        </div>
    );
}