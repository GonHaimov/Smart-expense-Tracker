import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { loginUser } from "../api/api"; // Import the function to call the backend

const LoginPage = () => {
  // State variables to store form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Used to navigate to another page after login

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page refresh when the form is submitted

    try {
      const response = await loginUser({ email, password });  // Send data to the backend
      localStorage.setItem("token", response.data.token);  // Store the token in local storage
      navigate("/home");  // Redirect to the home page after login
    } catch (error) {
      alert("Login failed: " + error.response.data.detail); // Show an error message if login fails
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>  {/* Calls handleLogin when form is submitted */}
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
