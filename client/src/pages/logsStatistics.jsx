import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';
import PieChart from '@/components/pieChart';
import LineChart from '@/components/lineChart';
import BarChart from '@/components/barChart';
import DonutChart from '@/components/doughnutChart';
import DataCard from '@/components/dataCard';
import { MoveDownLeftIcon } from 'lucide-react';
import Cookies from 'js-cookie';

const LogStatistics = () => {

    const useRender = !true;
    const navigate = useNavigate();
    const [logs, setLogs] = useState({
        creationLogs: [],
        modificationLogs: [],
        deletionLogs: [],
        requestLogs: []
    });
    const jwt = Cookies.get('jwt');
    const apiUrl = import.meta.env[`VITE_G6_API_URL`];
    const [error, setError] = useState([]);
    const [creationLogs, setCreationLogs] = useState([]);
    const [modLogs, setModLogs] = useState([]);
    const [deletionLogs, setDeletionLogs] = useState([]);
    const [requestLogs, setRequestLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchValue, setsearchValue] = useState(""); 
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedRadio, setSelectedRadio] = useState('user_id');

    const fetchLogs = async (filter) => {
        setLoading(true);
        try {
            //const response = useRender ? await axios.get(`https://authinc-inc2024-group6-s17i.onrender.com/api/${filter}/viewAll`) : await axios.get(`http://localhost:8081/api/${filter}/viewAll`);
            const createLogs = useRender ? await axios.get(`${apiUrl}/api/creation/view${filter}`) : await axios.get(`http://localhost:8081/api/creation/view${filter}`);
            const modifyLogs = useRender ? await axios.get(`${apiUrl}/api/modification/view${filter}`) : await axios.get(`http://localhost:8081/api/modification/view${filter}`);
            const deleteLogs = useRender ? await axios.get(`${apiUrl}/api/deletion/view${filter}`) : await axios.get(`http://localhost:8081/api/deletion/view${filter}`);
            const reqLogs = useRender ? await axios.get(`${apiUrl}/api/request/viewAll`) : await axios.get(`http://localhost:8081/api/request/viewAll`);
            setLogs({
                creationLogs: createLogs.data,
                modificationLogs: modifyLogs.data,
                deletionLogs: deleteLogs.data,
                requestLogs: reqLogs.data
            })
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

    useEffect(() => {
        const interval = setInterval(() => {
            fetchLogs(selectedFilter);
        }, 1000); // Update logs every second

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [selectedFilter]);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    }

    const handleSearchChange = (searchValue) => {
        setsearchValue(searchValue.target.value);
    };

    const handleSearchSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const validOptions = ['table_name', 'user_id'];
            
            if (!validOptions.includes(selectedRadio)) {
                throw new Error(`Invalid selectedSearchOption: ${selectedRadio}. Must be one of ${validOptions.join(', ')}.`);
            }

            const creationLogs = useRender
                ? await axios.get(`${apiUrl}/api/search/creation`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                })
                : await axios.get(`http://localhost:8081/api/search/creation`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                });

            const modifyLogs = useRender
                ? await axios.get(`${apiUrl}/api/search/modification`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                })
                : await axios.get(`http://localhost:8081/api/search/modification`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                });

            const deletionLogs = useRender
                ? await axios.get(`${apiUrl}/api/search/deletion`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                })
                : await axios.get(`http://localhost:8081/api/search/deletion`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue, selectedRadio }
                });
            /*
            const reqLogs = useRender
                ? await axios.get(`${apiUrl}/api/request/viewAllBy${selectedRadio}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue }
                })
                : await axios.get(`http://localhost:8081/api/request/viewAllBy${selectedRadio}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue }
                }); */

                if (creationLogs.data.length === 0 && modifyLogs.data.length === 0 && deletionLogs.data.length === 0 && reqLogs.data.length === 0) {
                    setError('No logs found for \'' + searchValue + '\'');
                } else {
                    setLogs({
                        creationLogs: creationLogs.data,
                        modificationLogs: modifyLogs.data,
                        deletionLogs: deletionLogs.data,
                        requestLogs: logs.requestLogs
                    })
                    setSelectedFilter(selectedRadio)
                    setError(null);
                }
        } catch (error) {
            console.error('Error searching logs:', error);
            setError('Error searching logs. Please try again.');
        } finally {
            setLoading(false);
            setsearchValue("")
        }
    };

    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mt-4">
                    log<span className="text-yellow-500">Stats</span>
                </h1>

                {/*<p className="text-lg text-gray-300 mx-3.5">
                    Statistics from Auth INC
                </p>*/}

                <div className="w-11/12 max-w-4xl mb-4 mt-4">
                    
                    <form onSubmit={handleSearchSubmit} className="flex flex-col items-start w-full">
                        <div className="flex items-center mb-4 w-full">
                            {/* Descriptive Text */}
                            <p className="text-md text-gray-50 mb-0">
                                Search for logs..
                            </p>

                            {/* Radio Buttons */}
                            <div className="flex ml-auto">
                                    <label className="mr-4 text-gray-50">
                                        <input
                                            type="radio"
                                            value="user_id"
                                            checked={selectedRadio === "user_id"}
                                            onChange={handleRadioChange}
                                            className="mr-2"
                                        />
                                        User ID
                                    </label>

                                    <label className="mr-4 text-gray-50">
                                        <input
                                            type="radio"
                                            value="table_name"
                                            checked={selectedRadio === 'table_name'}
                                            onChange={handleRadioChange}
                                            className="mr-2"
                                        />
                                        Table Name
                                    </label>
                                    {/*
                                    <label className="text-gray-50 mr-4">
                                        <input
                                            type="radio"
                                            value="os"
                                            checked={selectedRadio === 'os'}
                                            onChange={handleRadioChange}
                                            className="mr-2"
                                        />
                                        OS
                                    </label>
                                    
                                    <label className="text-gray-50">
                                        <input
                                            type="radio"
                                            value="ip"
                                            checked={selectedRadio === 'ip'}
                                            onChange={handleRadioChange}
                                        />
                                        IP
                                    </label>*/}
                            </div>
                        </div>
                        {/* Search Box */}
                        <div className="flex items-center w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                defaultValue={searchValue}
                                onChange={handleSearchChange}
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md text-black"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 active:bg-indigo-700"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                </div>
                
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
                                Refreshing logs
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
                                className="px-4 py-2 me-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                ) : null}
                                Refreshing data
                            </button>
                            <button
                                onClick={() => setSelectedFilter("All")}
                                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700 flex items-center"
                            >
                                Remove Filters
                            </button>

                        </div>
                    )}
                </div>
                {!error?(
                <div className="chart container py-3">
                    <div className="row">
                    <div className="pie-container col-2">
                        <PieChart 
                            logs={{
                                creationLogs: logs.creationLogs,
                                modificationLogs: logs.modificationLogs,
                                deletionLogs: logs.deletionLogs
                            }}
                        />
                    </div>

                    <div className="bar-container col-4">
                        <BarChart 
                            logs={{
                                creationLogs: logs.creationLogs,
                                modificationLogs: logs.modificationLogs,
                                deletionLogs: logs.deletionLogs
                            }}
                            title="Number of Requests by Type"
                        />                        
                    </div>
                    <div className='dataCard-container col-6'>
                            <div className='row'>
                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.requestLogs}
                                        title={"Total Requests per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>

                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.creationLogs}
                                        title={"POST per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.modificationLogs}
                                        title={"PUT per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>

                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.deletionLogs}
                                        title={"DELETE per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="doughnut-container col-3">
                            <DonutChart 
                                logs={{
                                    requestLogs: logs.requestLogs
                                }}
                            />
                        </div>
                        <div className="line-container col-8">
                            <LineChart 
                                logs={{
                                    creationLogs: logs.creationLogs,
                                    modificationLogs: logs.modificationLogs,
                                    deletionLogs: logs.deletionLogs
                                }}
                            />
                        </div>
                    </div>
                </div>
                ): (<></>)}
            </div>
        </>   
    );
};

export default LogStatistics;