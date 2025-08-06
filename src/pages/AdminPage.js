import React, { useState, useEffect } from "react";
import logo from "../resource/OnTime.png";
import LogoutButton from "../components/LogoutButton";
import { timeTrackingAPI } from "../api";

const AdminPage = ({ email, loggedIn, userRole, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [filterValues, setFilterValues] = useState({
    team: "all",
    startDate: "",
    endDate: "",
    break: "all",
  });

  // Fetch users and their time tracking data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await timeTrackingAPI.getEntries();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await timeTrackingAPI.getEntries();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    const filteredUsers = users.filter((user) => {
      // Filter by team
      if (filterValues.team !== "all" && user.team !== filterValues.team) {
        return false;
      }

      // Filter by date range
      if (filterValues.startDate && filterValues.endDate) {
        const userDate = new Date(user.date);
        const startDate = new Date(filterValues.startDate);
        const endDate = new Date(filterValues.endDate);
        if (userDate < startDate || userDate > endDate) {
          return false;
        }
      }

      return true;
    });

    setUsers(filteredUsers);
  };

  const handleRowEdit = (userId) => {
    setIsEditing(userId);
  };

  const handleSaveEdit = async (userId, updatedData) => {
    try {
      await timeTrackingAPI.updateEntry(userId, updatedData);
      setIsEditing(null);
      refreshData();
      // Refresh data
      const response = await timeTrackingAPI.getEntries();
      setUsers(response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4">
          <div className="flex justify-between h-14">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <img src={logo} alt="OnTime" className="h-6 w-auto" />
              <div className="flex space-x-2 text-sm">
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  REPORTS
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  TIME TRACKER
                </button>
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded">
                  TEAM
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  ADMIN
                </button>
              </div>
            </div>

            {/* Right Side Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{email}</span>
              <LogoutButton onLogout={onLogout} />
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Section */}
      <div className="max-w-full px-4 py-4">
        <div className="flex items-center space-x-3 text-sm">
          <span className="text-gray-600">FILTER</span>
          <select
            className="border rounded px-2 py-1 text-gray-600 bg-white"
            value={filterValues.team}
            onChange={(e) => handleFilterChange("team", e.target.value)}
          >
            <option value="all">All Teams</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <input
            type="date"
            className="border rounded px-2 py-1 text-gray-600 bg-white"
            value={filterValues.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-2 py-1 text-gray-600 bg-white"
            value={filterValues.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
            onClick={applyFilters}
          >
            APPLY FILTER
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3 text-sm">
        {/* Existing filter controls */}
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
          onClick={applyFilters}
        >
          APPLY FILTER
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-1 rounded text-sm hover:bg-gray-600"
          onClick={refreshData}
        >
          RESET
        </button>
      </div>

      {/* Users Table */}
      <div className="max-w-full px-4">
        <div className="bg-white rounded-sm shadow">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <span className="text-sm text-gray-600">All Users</span>
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
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-sm text-gray-900 hover:bg-gray-50"
                >
                  {isEditing === user.id ? (
                    // Editable row
                    <EditableRow
                      user={user}
                      onSave={(data) => handleSaveEdit(user.id, data)}
                      onCancel={() => setIsEditing(null)}
                    />
                  ) : (
                    // Display row
                    <DisplayRow
                      user={user}
                      onEdit={() => handleRowEdit(user.id)}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Editable Row Component
const EditableRow = ({ user, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(user);

  return (
    <>
      <input
        type="date"
        value={editedData.date}
        onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
        className="border rounded px-2 py-1 w-32 text-sm"
      />
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
            {user.user[0]}
          </div>
          {user.user}
        </div>
      </td>
      <td className="px-4 py-3">
        <input
          type="date"
          value={editedData.date}
          onChange={(e) =>
            setEditedData({ ...editedData, date: e.target.value })
          }
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="time"
          value={editedData.start}
          onChange={(e) =>
            setEditedData({ ...editedData, start: e.target.value })
          }
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="time"
          value={editedData.end}
          onChange={(e) =>
            setEditedData({ ...editedData, end: e.target.value })
          }
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="text"
          value={editedData.break}
          onChange={(e) =>
            setEditedData({ ...editedData, break: e.target.value })
          }
        />
      </td>
      <td className="px-4 py-3">{editedData.work}</td>
      <td className="px-4 py-3">
        <input
          type="text"
          value={editedData.capacity}
          onChange={(e) =>
            setEditedData({ ...editedData, capacity: e.target.value })
          }
        />
      </td>
      <td className="px-4 py-3">{editedData.overtime}</td>
      <td className="px-4 py-3">
        <button
          onClick={() => onSave(editedData)}
          className="text-green-600 hover:text-green-900 mr-2"
        >
          Save
        </button>
        <button onClick={onCancel} className="text-red-600 hover:text-red-900">
          Cancel
        </button>
      </td>
    </>
  );
};

// Display Row Component
const DisplayRow = ({ user, onEdit }) => {
  return (
    <>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
            {user.user[0]}
          </div>
          {user.user}
        </div>
      </td>
      <td className="px-4 py-3">{user.date}</td>
      <td className="px-4 py-3">{user.start}</td>
      <td className="px-4 py-3">{user.end}</td>
      <td className="px-4 py-3">{user.break}</td>
      <td className="px-4 py-3">{user.work}</td>
      <td className="px-4 py-3">{user.capacity}</td>
      <td className="px-4 py-3">{user.overtime}</td>
      <td className="px-4 py-3">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-900">
          Edit
        </button>
      </td>
    </>
  );
};

const refreshData = async () => {
  try {
    const response = await timeTrackingAPI.getEntries();
    setUsers(response.data);
    setFilterValues({
      team: "all",
      startDate: "",
      endDate: "",
      break: "all",
    });
  } catch (error) {
    console.error("Error refreshing data:", error);
  }
};

export default AdminPage;
