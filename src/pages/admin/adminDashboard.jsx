import React from "react";
import {
  Users,
  BarChart3,
  ShoppingCart,
  Bell,
  Search,
  Mail,
  
} from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Sample data for stats cards
  const stats = [
    { title: "Total Users", value: "2,845", icon: <Users />, trend: "+12.5%" },
    { title: "Revenue", value: "$45,231", icon: <BarChart3 />, trend: "+5.2%" },
    { title: "Orders", value: "384", icon: <ShoppingCart />, trend: "+8.1%" },
    { title: "Tickets", value: "23", icon: <Mail />, trend: "-2.3%" },
  ];

  // Sample data for recent activities
  const activities = [
    { user: "John Doe", action: "created a new account", time: "5 min ago" },
    {
      user: "Sarah Smith",
      action: "placed an order #38291",
      time: "15 min ago",
    },
    {
      user: "Alex Johnson",
      action: "submitted a support ticket",
      time: "1 hour ago",
    },
    {
      user: "Emma Wilson",
      action: "updated profile information",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

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
                  <span
                    className={`text-sm ${
                      stat.trend.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Monthly Revenue</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500">Revenue chart placeholder</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
