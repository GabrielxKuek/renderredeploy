import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';

const LogStatistics = () => {

    const [logs, setLogs] = useState([]);
    const [error, setError] = useState([]);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/creation/viewAll');
            setLogs(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Error fetching logs. Please try again.');
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    log<span className="text-yellow-500">Stats</span>
                </h1>

                <p className="text-lg text-gray-300">
                    Stats go here, probably gonna add a graph of some sort
                </p>
            </div>
        </>   
    );
};

export default LogStatistics;