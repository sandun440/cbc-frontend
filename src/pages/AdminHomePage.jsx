import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsClipboardData, BsPeople } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
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

const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: BsGraphUp },
    { to: "/admin/products", label: "Products", icon: BsBoxSeam },
    { to: "/admin/orders", label: "Orders", icon: BsClipboardData },
    { to: "/admin/customers", label: "Customers", icon: BsPeople },
    { to: "/admin/reviews", label: "Reviews", icon: MdStars },
];

export default function AdminHomePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data.type !== "admin") {
                toast.error("You are not authorized to access this page.");
                navigate("/login");
            } else {
                setUser(res.data);
            }
        })
        .catch(() => {
            toast.error("Failed to fetch user data.");
            navigate("/login");
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-[#f8f5f0]">
            {/* ── Sidebar ── */}
            <aside className="fixed inset-y-0 left-0 w-[240px] bg-[#1a1008] flex flex-col z-50 shadow-2xl">
                {/* Brand */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                    <img src="/logo.png" className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/40" />
                    <div>
                        <p className="font-playfair text-white font-bold text-sm leading-tight">Crystal Beauty</p>
                        <p className="text-accent text-[10px] tracking-widest uppercase">Admin Panel</p>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map(({ to, label, icon: Icon }) => {
                        const isActive = location.pathname.startsWith(to);
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                                        : "text-white/60 hover:bg-white/8 hover:text-white"
                                }`}
                            >
                                <Icon className="text-lg flex-shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info + Logout */}
                {user && (
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-3 px-2">
                            <img
                                src={user.profilePicture || "/default-profile.jpg"}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-accent/30"
                            />
                            <div className="min-w-0">
                                <p className="text-white text-xs font-semibold truncate">{user.firstName} {user.lastName}</p>
                                <p className="text-accent text-[10px] truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 justify-center py-2 text-xs text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        >
                            <FiLogOut size={14} /> Logout
                        </button>
                    </div>
                )}
            </aside>

            {/* ── Main Content ── */}
            <div className="ml-[240px] flex-1 min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-accent/10 px-8 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-secondary uppercase tracking-widest">
                            {navItems.find(n => location.pathname.startsWith(n.to))?.label || "Admin"}
                        </p>
                        <h1 className="font-playfair text-xl font-bold text-dark">
                            Crystal Beauty Clear
                        </h1>
                    </div>
                    {user && (
                        <div className="flex items-center gap-2 text-sm text-secondary">
                            <img
                                src={user.profilePicture || "/default-profile.jpg"}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium text-dark">{user.firstName}</span>
                        </div>
                    )}
                </header>

                {/* Routes */}
                {user ? (
                    <main className="p-6">
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
                    </main>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}