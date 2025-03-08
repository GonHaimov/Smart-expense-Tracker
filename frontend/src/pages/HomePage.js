import React from "react";
import "../styles/HomePage.css";  

const HomePage = () => {
  return (
    <div className="home-page"> 
      <div className="home-container">
        <h2>Welcome to Smart Expense Tracker!</h2>
        <p>Track your expenses easily and efficiently.</p>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
