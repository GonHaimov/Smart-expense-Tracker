import React, { useState } from "react";
import AppRoutes from "./routes";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(""); 

  return <AppRoutes userName={userName} setUserName={setUserName} />;
}

export default App;
