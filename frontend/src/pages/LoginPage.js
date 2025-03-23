import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { loginUser } from "../api/api"; 
import "../styles/LoginPage.css";

const LoginPage = ({ setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });  
      localStorage.setItem("token", response.data.token);  

      setUserName(response.data.user_name);  // ✅ שומר את שם המשתמש שהתקבל מה-Backend
      navigate("/home");  // ✅ מעביר את המשתמש לדף הבית
    } catch (error) {
      alert("Login failed: " + error.response.data.detail);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>  
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Login</button>
        </form>
        
        <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
