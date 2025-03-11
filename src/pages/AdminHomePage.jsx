import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { BsGraphUp, BsBoxSeam, BsClipboardData, BsPeople } from "react-icons/bs";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductFrom";

export default function AdminHomePage() {
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
                <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashbord</h1>} />
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/products/addProducts" element={<AddProductForm/>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/customers" element={<h1>Customers</h1>} />
                    <Route path = "/*" element = {<h1>404 not found</h1>}/>
                </Routes>
            </div>
        </div>
    );
}
