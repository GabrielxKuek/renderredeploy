import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Site from "./pages/Site.jsx";
import Profile from "./pages/Profile.jsx";
import Role from "./pages/Role.jsx";
import Group from "./pages/Group.jsx";
import Setting from "./pages/Setting.jsx"

function App() {
  const [headerWidth, setHeaderWidth] = useState("0");
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const width = `${headerRef.current.scrollWidth}px`;
      setHeaderWidth(width);
      headerRef.current.style.setProperty("--header-width", width);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/site" element={<Site />} />
        <Route path="/user" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Role" element={<Role />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
