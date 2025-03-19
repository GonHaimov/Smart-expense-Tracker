import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";
import { registerUser } from "../api/api"; // Import the function to call the backend

const RegisterPage = () => {
  // State variables to store form data
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents page refresh when the form is submitted

    try {
      // Send user data to the backend
      await registerUser({ user_name: userName, email, password });

      // If registration is successful, navigate to the login page
      navigate("/");
    } catch (error) {
      alert("Registration failed: " + error.response.data.detail); 
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}> {/* Calls handleRegister when form is submitted */}
          <input type="text" placeholder="User name" required value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
