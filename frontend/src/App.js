import React, { useState } from "react";
import AppRoutes from "./routes";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(""); // ✅ המשתנה שמחזיק את שם המשתמש

  return <AppRoutes userName={userName} setUserName={setUserName} />;
}

export default App;
