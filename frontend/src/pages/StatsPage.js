import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses } from "../api/api";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/StatsPage.css";

const StatsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState([]);
  const [byMonth, setByMonth] = useState([]);
  const [monthlyCategoryData, setMonthlyCategoryData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await getExpenses();
        const data = res.data.expenses;
        setExpenses(data);
        calculateStats(data);
        calculateMonthlyCategoryBreakdown(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateStats = (data) => {
    const totalAmount = data.reduce((sum, exp) => sum + exp.amount, 0);
    setTotal(totalAmount);

    const categoryMap = {};
    data.forEach((exp) => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
    });
    const categoryData = Object.entries(categoryMap).map(([category, value]) => ({
      category,
      value,
    }));
    setByCategory(categoryData);

    const monthMap = {};
    data.forEach((exp) => {
      const month = exp.date.slice(0, 7);
      monthMap[month] = (monthMap[month] || 0) + exp.amount;
    });
    const monthData = Object.entries(monthMap).map(([month, value]) => ({
      month,
      value,
    }));
    setByMonth(monthData);
  };

  const calculateMonthlyCategoryBreakdown = (data) => {
    const map = {};

    data.forEach((exp) => {
      const month = exp.date.slice(0, 7);
      if (!map[month]) map[month] = {};
      if (!map[month][exp.category]) map[month][exp.category] = 0;
      map[month][exp.category] += exp.amount;
    });

    const transformed = {};
    for (const month in map) {
      transformed[month] = Object.entries(map[month]).map(([category, value]) => ({
        category,
        value,
      }));
    }

    setMonthlyCategoryData(transformed);
  };

  const handleBack = () => {
    navigate("/home");
  };

  const avgPerMonth = byMonth.length > 0 ? (total / byMonth.length).toFixed(2) : 0;

  return (
    <div className="stats-page">
      <button className="back-button" onClick={handleBack}>← Back to Home</button>

      <h2 className="stats-header">📊 Watch Your Statistics</h2>

      <div className="stats-insights">
        <p><strong>Total Spent:</strong> ${total.toFixed(2)}</p>
        <p><strong>Number of Expenses:</strong> {expenses.length}</p>
        <p><strong>Average per Month:</strong> ${avgPerMonth}</p>
        {byCategory.length > 0 && (
          <p><strong>Top Category Overall:</strong> {byCategory.reduce((a, b) => a.value > b.value ? a : b).category}</p>
        )}
        {byMonth.length > 0 && (
          <p><strong>Most Expensive Month:</strong> {byMonth.reduce((a, b) => a.value > b.value ? a : b).month}</p>
        )}
      </div>

      <div className="graph-section">
        <h3>Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              nameKey="category"
              data={byCategory}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-section">
        <h3>Expenses by Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-section">
        <h3>Breakdown by Category for Each Month</h3>
        {Object.entries(monthlyCategoryData).map(([month, data]) => (
          <div key={month} style={{ marginBottom: "40px" }}>
            <h4>{month.slice(5, 7)}/{month.slice(2, 4)}</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  nameKey="category"
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#ffc658"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPage;