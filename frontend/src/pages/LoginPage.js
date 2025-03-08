import React from "react";
import { Link } from "react-router-dom";
import "../styles/LoginPage.css";  

const LoginPage = () => {
  return (
    <div className="login-page"> 
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
