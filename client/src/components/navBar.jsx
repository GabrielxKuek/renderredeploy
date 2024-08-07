// src/components/navBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// NavBar component for navigation
const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Auth INC</div>
        <div className="space-x-4">
          <Link to="/logsHome" className="text-gray-300 hover:text-white">
            LogsHome
          </Link>

          <Link to="/logsSomething" className="text-gray-300 hover:text-white">
            Something
          </Link>
          
          <Link to="/logsBoard" className="text-gray-300 hover:text-white">
            Board
          </Link>

          <Link to="/logsStatistics" className="text-gray-300 hover:text-white">
            Statistics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
