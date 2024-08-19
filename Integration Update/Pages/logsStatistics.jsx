import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_group_6 } from '@/interceptors/axios';
import NavBarReyes from '../components/auditNavBar';
import NavBarGroup1 from './Navbar.jsx';
import PieChart from '@/components/pieChart';
import LineChart from '@/components/lineChart';
import BarChart from '@/components/barChart';
import DonutChart from '@/components/doughnutChart';
import DataCard from '@/components/dataCard';
import { MoveDownLeftIcon } from 'lucide-react';

const LogStatistics = () => {

    const useRender = true;
    const navigate = useNavigate();
    const [logs, setLogs] = useState({
        creationLogs: [],
        modificationLogs: [],
        deletionLogs: [],
        requestLogs: []
    });
    const apiUrl = import.meta.env[`VITE_G6_API_URL`];
    const [error, setError] = useState([]);
    const [creationLogs, setCreationLogs] = useState([]);
    const [modLogs, setModLogs] = useState([]);
    const [deletionLogs, setDeletionLogs] = useState([]);
    const [requestLogs, setRequestLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('creation');

    const fetchLogs = async (filter, setLogType) => {
        setLoading(true);
        try {
            //const response = useRender ? await axios.get(`https://authinc-inc2024-group6-s17i.onrender.com/api/${filter}/viewAll`) : await axios.get(`http://localhost:8081/api/${filter}/viewAll`);
            const createLogs = useRender ? await api_group_6.get(`creation/viewAll`) : await axios.get(`http://localhost:8081/api/creation/viewAll`);
            const modifyLogs = useRender ? await api_group_6.get(`modification/viewAll`) : await axios.get(`http://localhost:8081/api/modification/viewAll`);
            const deleteLogs = useRender ? await api_group_6.get(`deletion/viewAll`) : await axios.get(`http://localhost:8081/api/deletion/viewAll`);
            const reqLogs = useRender ? await api_group_6.get(`request/viewAll`) : await axios.get(`http://localhost:8081/api/request/viewAll`);
            setLogs({
                creationLogs: createLogs,
                modificationLogs: modifyLogs,
                deletionLogs: deleteLogs,
                requestLogs: reqLogs
            })
            console.log(logs)
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
        fetchLogs(selectedFilter, setLogs);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchLogs(selectedFilter, setLogs);
        }, 60000); // Update logs every minute

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [selectedFilter]);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setIsDropdownVisible(false);
        navigate(`/logsStatistics`);
    }
    
    // console.log("creationLogs", logs);

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
                                        logsArgument={logs.requestLogs.data}//{requestLogs}
                                        title={"Total Requests per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>

                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.creationLogs.data}//{creationLogs}
                                        title={"POST per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.modificationLogs.data}//{modLogs}
                                        title={"PUT per Minute"}
                                        unit={"requests/min"}
                                    />
                                </div>

                                <div className="dataCard col-3">
                                    <DataCard
                                        logsArgument={logs.deletionLogs}//{deletionLogs}
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
                                    requestLogs: logs.requestLogs//requestLogs
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