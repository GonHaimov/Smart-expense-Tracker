import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = ({ userName, setUserName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // מוחק את הטוקן
    setUserName(""); // מאפס את שם המשתמש ב-state
    navigate("/"); // מעביר לדף ההתחברות
  };

  const handleAddExpense = () => {
    navigate("/add-expense")
  };

  const handleStats = () => {
    navigate("/stats")
  };

  return (
    <div className="home-page">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h2>Welcome, {userName}!</h2> 
      <p>Track your expenses easily and efficiently.</p>
      
      <div>
        <button className="add-expense-button" onClick={handleAddExpense}>Add Expense</button>
        <button className="stats-button" onClick={handleStats}>Watch Statistics</button>
      </div>

    </div>
      

  );
};

export default HomePage;
