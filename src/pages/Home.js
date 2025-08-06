import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "📊",
      description: "View key metrics and analytics",
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "📈",
      description: "Generate and view detailed reports",
    },
    {
      title: "Team Calendar",
      path: "/calendar",
      icon: "📅",
      description: "Manage team schedules and events",
    },
    {
      title: "User Management",
      path: "/admin",
      icon: "👥",
      description: "Manage user accounts and permissions",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">OnTime</h2>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome to OnTime
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{item.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
