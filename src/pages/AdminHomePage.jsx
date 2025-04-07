import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsClipboardData, BsPeople } from "react-icons/bs";
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
import { MdStars } from "react-icons/md";
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
                if(res.data.type != "admin"){
                    toast.error("You are not authorized to access this page.");
                    navigate("/login");
                }else{
                    setUser(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch user data.");
                navigate("/login");
            });
        },[])
    return (
        <div className="bg-blue-200 w-full h-screen flex">
            {/* Sidebar */}
            <div className="w-[20%] h-screen bg-linear-to-r from-cyan-500 to-blue-500 flex flex-col items-center  space-y-2">

                <h1 className="font-bold text-3xl text-accent bg-amber-100 w-full p-2 h-20 flex justify-center items-center">Crystal Beauty Clear</h1>
                <h1 className="font-semibold text-3xl text-blue-100 w-full p-2 h-20 flex justify-center items-center">Admin Panel</h1>

                <Link className="flex items-center w-full mt-10 py-5 hover:bg-white hover:text-blue-500 text-white justify-center space-x-5 rounded-l-full" to="/admin/dashboard">
                    <BsGraphUp className="size-6"/> <span>Dashboard</span>
                </Link>
                <Link className="flex items-center w-full  py-5 hover:bg-white hover:text-blue-500 text-white justify-center rounded-l-full space-x-5" to="/admin/products">
                    <BsBoxSeam className="size-6"/> <span>Products</span>
                </Link>
                <Link className="flex items-center   w-full  py-5 hover:bg-white hover:text-blue-500 text-white justify-center rounded-l-full space-x-5" to="/admin/orders">
                    <BsClipboardData className="size-6"/> <span>Orders</span>
                </Link>
                <Link className="flex items-center  w-full  py-5 hover:bg-white hover:text-blue-500 text-white justify-center rounded-l-full space-x-5" to="/admin/customers">
                    <BsPeople className="size-6"/> <span>Customers</span>
                </Link>
                <Link className="flex items-center  w-full  py-5 hover:bg-white hover:text-blue-500 text-white justify-center rounded-l-full space-x-5" to="/admin/reviews">
                    <MdStars className="size-6"/> <span>Rivews</span>
                </Link>
            </div>
            {/* Main Content Area */}
            <div className="w-[80%] h-screen">

                {user!=null&&<Routes path="/*">
                    <Route path="/dashboard" element={<AdminDashboardPage/>} />
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/products/addProducts" element={<AddProductForm/>} />
                    <Route path ="/products/editProduct" element={<EditProductForm/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>} />
                    <Route path="/customers" element={<AdminUserDetails/>} />
                    <Route path="/customers/editUser" element={<EditUserForm/>}/>
                    <Route path="/reviews" element={<AdminRivewPage/>}/>
                    <Route path = "/reviews/editReview" element={<EditReview/>}/>
                    <Route path = "/*" element = {<NotFound/>}/>
                </Routes>}
                {
                    user==null&&<div className="w-full h-full flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-accent"></div>
                    </div>
                }
            </div>
        </div>
    );
}
