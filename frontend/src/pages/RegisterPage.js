import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterPage.css";  

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="User name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
