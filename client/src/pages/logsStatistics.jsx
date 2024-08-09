import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';

const LogStatistics = () => {

    // config
    const useRender = true;

    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('creation');

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const fetchLogs = async (filter) => {
        setLoading(true);
        try {
            const response = useRender ? await axios.get(`https://authinc-inc2024-group6.onrender.com/api/${filter}/viewAll`) : await axios.get(`http://localhost:8081/api/${filter}/viewAll`);
            setLogs(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching logs. Please try again.');
            setLogs([]); // Clear logs in case of error
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        } 
    };

    const data = [300, 50, 100, 20];

    // Pie chart
    useEffect(() => {
        if (logs.length > 0 && chartRef.current) {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current=new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["GET", "POST", "PUT", "DELETE"],
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(0, 255, 0)'
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
    }
    }, []); 

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setIsDropdownVisible(false);
        fetchLogs(selectedFilter);
        navigate(`/logsStatistics`);
    }

    useEffect(() => {
        fetchLogs(selectedFilter);
    }, [selectedFilter]);
    
    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    Log <span className="text-yellow-600">Statistics</span>
                </h1>

                {/* fetch data */}
                <div className="flex justify-between items-center w-11/12 max-w-4xl mb-4 mt-4">
                    {error && (
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => fetchLogs(selectedFilter)}
                                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : null}
                                Retry
                            </button>

                            <div className="ml-4 text-red-500">
                                {error}
                            </div>
                        </div>
                    )}
                    {!error && (
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => fetchLogs(selectedFilter)}
                                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : null}
                                Refresh
                            </button>
                        </div>
                    )}

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                        >
                            Filter
                        </button>
                        {isDropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg z-50">
                                <ul className="py-1">
                                    <li
                                        onClick={() => handleFilterSelect('request')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-b"
                                    >
                                        um_request_log
                                    </li>
                                    <li
                                        onClick={() => handleFilterSelect('creation')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t border-b"
                                    >
                                        um_creation_log
                                    </li>
                                    <li
                                        onClick={() => handleFilterSelect('modification')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t border-b"
                                    >
                                        um_modification_log
                                    </li>
                                    <li
                                        onClick={() => handleFilterSelect('deletion')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t"
                                    >
                                        um_deletion_log
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='chart-container'>
                    {console.log(logs.length)}
                    {logs.length > 0 && (
                        <div className="pie-chart">
                            <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
                        </div>
                    )}
                </div>      
            </div>
        </>

    );
};

export default LogStatistics;

/*

    useEffect(() => {
        fetchLogs();
    }, []);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const pieDetails = useRef(null);

    const data = [300, 50, 100, 20];

    // Create pie chart
    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current=new Chart(myChartRef, {
            type: "pie",
            data: {
                labels: ["GET", "POST", "PUT", "DELETE"],
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(0, 255, 0)'
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

    // Create pie chart percentages to be shown
    //const sum = data.reduce(currentValue, total => total + currentValue)
    useEffect(() => {
        if (pieDetails.current) {
            pieDetails.current.destroy();
        }
    },[])


        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    log<span className="text-yellow-500">Stats</span>
                </h1>

                <div class="chart-container">
                    <canvas ref={chartRef} style={{width:"300px", height:"200px"}}/>
                </div>

                <div class="details text-white">
                    <ul>
                        <li>GET: <span class="percentage">40%</span></li>
                        <li>POST: <span class="percentage">20%</span></li>
                        <li>PUT: <span class="percentage">30%</span></li>
                        <li>DELETE: <span class="percentage">10%</span></li>
                    </ul>
                </div>
            </div>
        </>   */