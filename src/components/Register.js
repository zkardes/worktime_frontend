import React, { useState } from 'react';
import api from '../api';

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {};
    try {
      await api.post("/users/register", user); // Update endpoint
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {success && <p className="text-success">Registration successful! Please login.</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
};

export default Register;
