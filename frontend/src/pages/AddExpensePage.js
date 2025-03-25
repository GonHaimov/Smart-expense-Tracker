import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../api/api";
import "../styles/AddExpensePage.css";

const AddExpensePage = () => {
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
        "clothing",
        "car",
        "health",
        "rent",
        "fitness",
        "travel",
        "entertainment",
        "utilities",
        "dining out",
        "gifts",
        "phone",
        "else"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be a number greater than 0");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    if (!date) {
        setError("Please select a date");
        return;
      }
  
      const newExpense = {
        amount: Number(amount),
        category,
        date, 
      };

    try {
      await addExpense(newExpense); // send to the backend
      setSuccess("Expense added successfully!");
      setError("");
      setAmount("");
      setCategory("");
      setDate("");

    } catch (err) {
      setError("Failed to add expense: " + err.response?.data?.detail || err.message);
      setSuccess("");
    }
  };

  const handleHomePage = () => {
    navigate("/home")
  };

  return (
    <div className="add-expense-page">
      <button className="home-button" onClick={handleHomePage}>Home page</button>
      <div>
        <h2 className="title">Add New Expense</h2>
        <form className="expense-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit">Add Expense</button>
        </form>
        </div>
    </div>
  );
};

export default AddExpensePage;
