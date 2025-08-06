import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { handleLogout } from "./api";
import AdminPage from "./pages/AdminPage"; // Add this import

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleLogoutLocal = async () => {
    try {
      await handleLogout();
      setLoggedIn(false);
      setEmail("");
      setUserRole("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("userRole");

    if (token && storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
      setUserRole(storedRole);
    }
  }, []);

  // Protected Route for admin access
  const AdminRoute = ({ children }) => {
    if (!loggedIn || userRole !== "ADMIN") {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  // Protected Route for any authenticated user
  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <RegisterPage
                  setLoggedIn={setLoggedIn}
                  setEmail={setEmail}
                  setUserRole={setUserRole}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login
                  setLoggedIn={setLoggedIn}
                  setEmail={setEmail}
                  setUserRole={setUserRole}
                />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  email={email}
                  loggedIn={loggedIn}
                  userRole={userRole}
                  onLogout={handleLogoutLocal}
                />
              </ProtectedRoute>
            }
          />
          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage
                  email={email}
                  loggedIn={loggedIn}
                  userRole={userRole}
                  onLogout={handleLogoutLocal}
                />
              </AdminRoute>
            }
          />
          {/* Redirect root to register for non-authenticated users, or dashboard for authenticated users */}
          <Route
            path="/"
            element={<Navigate to={loggedIn ? "/dashboard" : "/register"} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
