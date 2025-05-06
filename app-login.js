import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

