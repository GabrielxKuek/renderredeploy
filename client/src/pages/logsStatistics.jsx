import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';
import PieChart from '@/components/pieChart';
import LineChart from '@/components/lineChart';
import BarChart from '@/components/barChart';

const LogStatistics = () => {

    const useRender = true;
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('creation');

    const fetchLogs = async (filter) => {
        setLoading(true);
        try {
            const response = useRender ? await axios.get(`https://authinc-inc2024-group6-s17i.onrender.com/api/${filter}/viewAll`) : await axios.get(`http://localhost:8081/api/${filter}/viewAll`);
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

    useEffect(() => {
        fetchLogs(selectedFilter);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setIsDropdownVisible(false);
        navigate(`/logsStatistics`);
    }
    
    /*
    // Stacked bar chart
    useEffect(() => {        
        if (stackedBarInstance.current) {
            stackedBarInstance.current.destroy();
        }
        const myStackedBarRef = stackedBarRef.current.getContext('2d');

        stackedBarInstance.current=new Chart(myStackedBarRef, {
            type: 'bar',
            data: {
                labels: ["Chocolate", "Vanilla", "Strawberry"],
                datasets:[
                    {
                        label: "Blue",
                        backgroundColor: "blue",
                        data: [3,7,4]
                    },
                    {
                        label: "Red",
                        backgroundColor: "red",
                        data: [4,3,5]
                    },
                    {
                        label: "Green",
                        backgroundColor: "green",
                        data: [7,2,6]
                    }
                ]
            }  
        })
    }) */

    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    log<span className="text-yellow-500">Stats</span>
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

                            {/* <div className="ml-4 text-white">
                                Displaying results for <span className="text-orange-300">um_{selectedFilter}_log</span>
                            </div> */}
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
                <div className="chart container">
                    <div className="row">
                    <div className="pie-container col-2">
                        <PieChart />
                    </div>

                    <div className="line-container col-3">
                        <LineChart />
                    </div>

                    <div className="stackedBar-container col-7">
                        <BarChart 
                            argument={logs}
                        />
                    </div>
                    </div>

                    <div className="row">
                    <div className="stackedBar-container col-9">
                        <BarChart 
                            argument={logs}
                        />
                    </div>
                    </div>

                    <div className="row">
                    <div className="stackedBar-container col-9">
                        <BarChart 
                            argument={logs}
                        />
                    </div>
                    </div>
                </div>
            </div>
        </>   
    );
};

export default LogStatistics;