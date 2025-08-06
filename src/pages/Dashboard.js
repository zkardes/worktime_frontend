import React from "react";
import logo from "../resource/OnTime.png";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Dashboard = ({ email, loggedIn, userRole, onLogout }) => {
  const dummyData = [
    {
      id: 1,
      user: "Joe",
      avatar: "J",
      date: "01/05/2023",
      start: "09:00",
      end: "-",
      break: "-",
      work: "-",
      capacity: "8.00h",
      overtime: "-",
      timeoff: "-",
    },
    {
      id: 2,
      user: "Amy",
      avatar: "A",
      date: "01/05/2023",
      start: "11:00",
      end: "-",
      break: "-",
      work: "-",
      capacity: "8.00h",
      overtime: "-",
      timeoff: "-",
    },
    {
      id: 3,
      user: "Stacey",
      avatar: "S",
      date: "01/05/2023",
      start: "12:00",
      end: "-",
      break: "0.50h",
      work: "-",
      capacity: "8.00h",
      overtime: "-",
      timeoff: "-",
    },
    {
      id: 4,
      user: "Adam",
      avatar: "A",
      date: "01/05/2023",
      start: "09:00",
      end: "17:30",
      break: "0.50h",
      work: "8.00h",
      capacity: "8.00h",
      overtime: "-",
      timeoff: "-",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4">
          <div className="flex justify-between h-14">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="OnTime"
                style={{ height: "50px", width: "100px" }}
              />
              <div className="flex space-x-2 text-sm">
                <Link
                  to="/home"
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded"
                >
                  HOME
                </Link>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  TIME TRACKER
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  CALENDAR
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  TEAM
                </button>
                {/* In your Dashboard.js navigation section */}
                {userRole === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    ADMIN
                  </Link>
                )}
              </div>
            </div>

            {/* Right Side Menu */}
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                {email}
              </button>
              <LogoutButton onLogout={onLogout} />
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4">
          <div className="flex space-x-4 h-12 items-center text-sm">
            <button className="px-3 py-1 text-blue-500 border-b-2 border-blue-500">
              Summary
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
              Detailed
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
              Weekly
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
              Schedule
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-gray-900">
              Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center space-x-3 text-sm">
          <span className="text-gray-600">FILTER</span>
          <select className="border rounded px-2 py-1 text-gray-600 bg-white">
            <option>Team</option>
          </select>
          <select className="border rounded px-2 py-1 text-gray-600 bg-white">
            <option>Start</option>
          </select>
          <select className="border rounded px-2 py-1 text-gray-600 bg-white">
            <option>End</option>
          </select>
          <select className="border rounded px-2 py-1 text-gray-600 bg-white">
            <option>Break</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600">
            APPLY FILTER
          </button>
        </div>
      </div>

      {/* Time Tracking Table */}
      <div className="max-w-full px-4">
        <div className="bg-white rounded-sm shadow">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">Attendance</span>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Export
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-500 uppercase">
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  USER
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  DATE
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  START
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  END
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  BREAK
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  WORK
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  CAPACITY
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  OVERTIME
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  TIME OFF
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dummyData.map((row) => (
                <tr
                  key={row.id}
                  className="text-sm text-gray-900 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                        {row.avatar}
                      </div>
                      {row.user}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.start}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.end}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.break}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.work}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.capacity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.overtime}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.timeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
