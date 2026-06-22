import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, Package, ShoppingCart, Star, TrendingUp } from "lucide-react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart,
} from "recharts";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/count")
      .then((res) => setUserCount(res.data.count)).catch(() => {});
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/count")
      .then((res) => setOrderCount(res.data.count)).catch(() => {});
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews/count")
      .then((res) => setReviewCount(res.data.count)).catch(() => {});
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/count")
      .then((res) => setProductCount(res.data.count)).catch(() => {});
  }, []);

  const chartData = [
    { month: "Jan", revenue: 70000 },
    { month: "Feb", revenue: 170000 },
    { month: "Mar", revenue: 95000 },
    { month: "Apr", revenue: 140000 },
    { month: "May", revenue: 110000 },
    { month: "Jun", revenue: 190000 },
  ];

  const stats = [
    { title: "Total Users", value: userCount, icon: Users, color: "bg-blue-50 text-blue-600", trend: "+12%" },
    { title: "Products", value: productCount, icon: Package, color: "bg-emerald-50 text-emerald-600", trend: "+5%" },
    { title: "Orders", value: orderCount, icon: ShoppingCart, color: "bg-accent/10 text-accent", trend: "+18%" },
    { title: "Reviews", value: reviewCount, icon: Star, color: "bg-amber-50 text-amber-600", trend: "+8%" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-accent/20 rounded-xl p-3 shadow-lg">
          <p className="text-xs text-secondary mb-1">{label}</p>
          <p className="font-bold text-accent text-sm">LKR {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-playfair text-2xl font-bold text-dark">Dashboard Overview</h2>
        <p className="text-secondary text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-accent/8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> {stat.trend}
              </span>
            </div>
            <p className="text-secondary text-sm mb-1">{stat.title}</p>
            <p className="font-playfair text-3xl font-bold text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-accent/8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-playfair text-lg font-bold text-dark">Revenue Overview</h3>
            <p className="text-secondary text-xs mt-1">Monthly revenue for this year</p>
          </div>
          <div className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
            2025
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cd7225" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#cd7225" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5e5d5d" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5e5d5d" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#cd7225"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{ fill: "#cd7225", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#cd7225" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Add New Product", to: "/admin/products/addProducts", icon: Package, color: "from-accent to-accent-dark" },
          { label: "View All Orders", to: "/admin/orders", icon: ShoppingCart, color: "from-emerald-500 to-emerald-700" },
          { label: "Manage Customers", to: "/admin/customers", icon: Users, color: "from-blue-500 to-blue-700" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.to}
            className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${action.color} text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
          >
            <action.icon size={20} />
            <span className="font-semibold text-sm">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
