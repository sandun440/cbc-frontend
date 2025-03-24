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
            <div className="w-[20%] h-screen bg-blue-500 flex flex-col items-center p-4 space-y-4">
                <Link className="flex items-center space-x-2 text-white" to="/admin/dashboard">
                    <BsGraphUp /> <span>Dashboard</span>
                </Link>
                <Link className="flex items-center space-x-2 text-white" to="/admin/products">
                    <BsBoxSeam /> <span>Products</span>
                </Link>
                <Link className="flex items-center space-x-2 text-white" to="/admin/orders">
                    <BsClipboardData /> <span>Orders</span>
                </Link>
                <Link className="flex items-center space-x-2 text-white" to="/admin/customers">
                    <BsPeople /> <span>Customers</span>
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
                    <Route path = "/*" element = {<h1>404 not found</h1>}/>
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
