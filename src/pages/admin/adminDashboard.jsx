import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Users,
  Package,
  ShoppingCart,
  Star
} from "lucide-react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  // Fetch User Count from Backend
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/users/count")
      .then((res) => setUserCount(res.data.count))
      .catch((err) => console.log("Error loading user count", err));

      axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/orders/count")
      .then((res) => setOrderCount(res.data.count))
      .catch((err) => console.log("Error loading order count", err));
      
      axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/reviews/count")
      .then((res) => setReviewCount(res.data.count))
      .catch((err) => console.log("Error loading Review count", err));

      axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/products/count")
      .then((res) => setProductCount(res.data.count))
      .catch((err) => console.log("Error loading Review count", err));
  }, []);

  // Chart sample data
  const chartData = [
    { month: "Jan", revenue: 70000 },
    { month: "Feb", revenue: 170000 },
    { month: "Mar", revenue: 70000 },
    { month: "Apr", revenue: 170000 },
    { month: "May", revenue: 70000 },
    { month: "Jun", revenue: 170000 },
  ];

  // Stats Cards
  const stats = [
    { title: "Total Users", value: userCount, icon: <Users size={22} />},
    { title: "Products", value: productCount, icon: <Package size={22} />},
    { title: "Orders", value: orderCount, icon: <ShoppingCart size={22} />},
    { title: "Riviews", value: reviewCount, icon: <Star size={22} />},
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard Overview</h1>
        </header>

        {/* Body */}
        <main className="p-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-500 font-medium">{stat.title}</h2>
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {stat.icon}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-medium mb-4">Monthly Revenue</h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;
