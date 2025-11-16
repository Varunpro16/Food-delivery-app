// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; 
import Driver from "./components/Driver"; 
import Payment from "./components/Payment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/driverPage" element={<Driver />} />
      </Routes>
    </Router>
  );
};

export default App;
