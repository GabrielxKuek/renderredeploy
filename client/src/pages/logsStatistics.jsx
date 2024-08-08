import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
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

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current=new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["Label 1", "Label 2", "Label 3"],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                    }
                ]
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        }
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

                <div class="chart-container">
                    <canvas ref={chartRef} style={{width:"300px", height:"200px"}}/>
                </div>

                <div class="details">
                    <ul>
                        <li>GET: <span class="percentage">40%</span></li>
                        <li>POST: <span class="percentage">20%</span></li>
                        <li>PUT: <span class="percentage">30%</span></li>
                        <li>DELETE: <span class="percentage">10%</span></li>
                    </ul>
                </div>
            </div>
        </>   
    );
};

export default LogStatistics;