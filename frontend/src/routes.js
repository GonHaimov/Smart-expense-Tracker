import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddExpensePage from "./pages/AddExpensePage";
import StatsPage from "./pages/StatsPage";

const AppRoutes = ({ userName, setUserName }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserName={setUserName} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage userName={userName} setUserName={setUserName} />} />
        <Route path="/add-expense" element={<AddExpensePage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
