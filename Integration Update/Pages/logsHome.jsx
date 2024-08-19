import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import NavBarReyes from '../components/auditNavBar';
import NavBarGroup1 from "./Navbar.jsx";

const logsHome = () => {
    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />
            
            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    Auth <span className="text-indigo-500">INC</span>
                </h1>

                <p className="text-lg text-gray-300">
                    Welcome to your user management system
                </p>
            </div>
        </>
    );
}

export default logsHome;