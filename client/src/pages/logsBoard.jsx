import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import { format, set } from 'date-fns';

Modal.setAppElement('#root');

const LogsBoard = () => {

    // config
    const logsPerPage = 10;
    const useRender = !true;

    // declaration
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const jwt = Cookies.get('jwt');
    const apiUrl = import.meta.env[`VITE_G6_API_URL`];
    const navigate = useNavigate();
    const query = useQuery();
    const page = parseInt(query.get('page')) || 1;
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedtableDisplay, setSelectedtableDisplay] = useState('creation');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const totalPages = Math.ceil((isSearching ? searchResults : logs).length / logsPerPage);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchValue, setsearchValue] = useState(""); 
    const [displaySearchResults, setDisplaySearchResults] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchInput, setSearchInput] = useState(null);

    const fetchLogs = async (tableDisplay) => {
        setLoading(true);
        try {
            const response = useRender ? await axios.get(`${apiUrl}/api/${tableDisplay}/viewAll`, {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              }) : await axios.get(`http://localhost:8081/api/${tableDisplay}/viewAll`, {
                headers: {
                  Authorization: `Bearer ${jwt}`
                }
              });

            const readableLogs = response.data.map(log => ({
                ...log,
                email: log.um_user ? log.um_user.email : 'Unknown',
            }));
    
            setLogs(readableLogs);

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

    const handleSearchChange = (searchValue) => {
        setsearchValue(searchValue.target.value);
    };

    // const handleSearchSubmit = async (event) => {
    //     setLoading(true);
    //     event.preventDefault();
    //     try {
    //         const response = useRender
    //             ? await axios.get(`${apiUrl}/api/search/${selectedtableDisplay}`, {
    //                 headers: { Authorization: `Bearer ${jwt}` },
    //                 params: { searchValue }
    //             })
    //             : await axios.get(`http://localhost:8081/api/search/${selectedtableDisplay}`, {
    //                 headers: { Authorization: `Bearer ${jwt}` },
    //                 params: { searchValue }
    //             });
    //         setSearchResults(response.data);
    //         setIsSearching(true);
    //     } catch (error) {
    //         console.error('Error searching logs:', error);
    //         setSearchResults([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSearchSubmit = async (event) => {
    //     setLoading(true);
    //     event.preventDefault();
    //     try {
    //         const response = useRender
    //             ? await axios.get(`${apiUrl}/api/search/${selectedtableDisplay}`, {
    //                 headers: { Authorization: `Bearer ${jwt}` },
    //                 params: { searchValue }
    //             })
    //             : await axios.get(`http://localhost:8081/api/search/${selectedtableDisplay}`, {
    //                 headers: { Authorization: `Bearer ${jwt}` },
    //                 params: { searchValue }
    //             });

    //             const readableLogs = response.data.map(log => ({
    //                 ...log,
    //                 email: log.um_user ? log.um_user.user_name : 'Unknown',
    //             }));
        
    //         setLogs(readableLogs);

    //         setSearchResults(response.data);
    //         setIsSearching(true);
    //     } catch (error) {
    //         console.error('Error searching logs:', error);
    //         setSearchResults([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSearchSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = useRender
                ? await axios.get(`${apiUrl}/api/search/${selectedtableDisplay}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue }
                })
                : await axios.get(`http://localhost:8081/api/search/${selectedtableDisplay}`, {
                    headers: { Authorization: `Bearer ${jwt}` },
                    params: { searchValue }
                });
    
                if (response.data.length === 0) {
                    setError('No logs found for \'' + searchValue + '\'');
                    setSearchResults([]);
                } else {
                    setSearchResults(response.data);
                    setError(null);
                }
            setIsSearching(true);
            setHasSearched(true);
        } catch (error) {
            console.error('Error searching logs:', error);
            setSearchResults([]);
            setError('Error searching logs. Please try again.');
        } finally {
            setLoading(false);
            setDisplaySearchResults(true);
            setSearchInput(searchValue);
            setsearchValue('');
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            navigate(`/logsBoard?page=${page + 1}`);
        } else {
            console.log("no more next page");
        }
    }

    const handlePrevPage = () => {
        if (page > 1) {
            navigate(`/logsBoard?page=${page - 1}`);
        } else {
            console.log("no more previous page");
        }
    }

    const handleInputPage = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0 && value <= totalPages && value !== page) {
            navigate(`/logsBoard?page=${value}`);
        } else if (value > totalPages) {
            navigate(`/logsBoard?page=${totalPages}`);
        } else {
            console.log("invalid page number");
        }
    }

    const handleRowClick = (log) => {
        console.log("Row clicked:", log);
        if (selectedtableDisplay == 'modification' || selectedtableDisplay == 'deletion'){
            setExpandedRow(expandedRow === log.log_id ? null : log.log_id);
        }
    }

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handletableDisplaySelect = (tableDisplay) => {
        setSelectedtableDisplay(tableDisplay);
        setIsSearching(false);
        setIsDropdownVisible(false);
        setDisplaySearchResults(false);
        setHasSearched(false);
        navigate(`/logsBoard`);
    }

    const openModal = (log) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null);
    };

    useEffect(() => {
        fetchLogs(selectedtableDisplay);
    }, [selectedtableDisplay, page]);

    useEffect(() => {
        console.log("Expanded Row:", expandedRow);
    }, [expandedRow]);
    
    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    Log <span className="text-green-600">Board</span>
                </h1>

                <p className="text-lg text-gray-300 mx-3.5">
                    Collection of logs for Auth INC
                </p>

                {/* Search Bar */}
                <div className="w-11/12 max-w-4xl mb-4 mt-4">
                    <p className="text-md text-gray-300 mb-2">
                        Search for log_id, user_id, table_name or record_id...
                    </p>
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md text-black"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 active:bg-indigo-700"
                        >
                            Search
                        </button>
                    </form>
                </div>
                
                {/* fetch data */}
                <div className="flex justify-between items-center w-11/12 max-w-4xl mb-4 mt-4">
                    {error && (
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => fetchLogs(selectedtableDisplay)}
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
                                onClick={() => fetchLogs(selectedtableDisplay)}
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

                            {hasSearched && (
                                <div className="text-white text-center ml-4">
                                    Showing results for <span className="font-bold text-green-500">'{searchInput}'</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                        >
                            Tables
                        </button>
                        {isDropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg z-50">
                                <ul className="py-1">
                                    <li
                                        onClick={() => handletableDisplaySelect('request')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-b"
                                    >
                                        um_request_log
                                    </li>
                                    <li
                                        onClick={() => handletableDisplaySelect('creation')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t border-b"
                                    >
                                        um_creation_log
                                    </li>
                                    <li
                                        onClick={() => handletableDisplaySelect('modification')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t border-b"
                                    >
                                        um_modification_log
                                    </li>
                                    <li
                                        onClick={() => handletableDisplaySelect('deletion')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-800 text-white border-t"
                                    >
                                        um_deletion_log
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* table */}
                <div className="w-11/12 max-w-4xl" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {logs.length > 0 && !error ? (
                        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
                            <table className="min-w-full bg-gray-700 text-white rounded" style={{ tableLayout: 'fixed' }}>
                                <thead className="sticky top-0 bg-gray-700 shadow-md">
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-600">Log ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">User</th>
                                        {/* <th className="py-2 px-4 border-b border-gray-600">Site ID</th> */}
                                        <th className="py-2 px-4 border-b border-gray-600">Table Name</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Record ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Created At</th>
                                        {selectedtableDisplay === 'modification' || selectedtableDisplay === 'deletion' ? (
                                            <th className="py-2 px-4 border-b border-gray-600">{null}</th>
                                        ) : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(isSearching ? searchResults : logs)
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .slice(page * logsPerPage - logsPerPage, page * logsPerPage)
                                    .map((log, index) => (
                                        <React.Fragment key={log.log_id}>
                                            <tr className={index % 2 === 0 ? "bg-slate-600" : ""} onClick={() => handleRowClick(log)} style={{cursor: 'pointer'}}>
                                                <td className="py-2 px-4 border-b border-gray-600">{log.log_id}</td>
                                                {displaySearchResults ? (
                                                    <td className="py-2 px-4 border-b border-gray-600">{log.um_user.email}</td>
                                                ) : (
                                                    <td className="py-2 px-4 border-b border-gray-600">{log.email}</td>
                                                )}

                                                {/* <td className="py-2 px-4 border-b border-gray-600">{log.site_id}</td> */}
                                                <td className="py-2 px-4 border-b border-gray-600">{log.table_name}</td>
                                                <td className="py-2 px-4 border-b border-gray-600">{log.record_id}</td>
                                                <td className="py-2 px-4 border-b border-gray-600">{format(new Date(log.created_at), 'MMMM do, yyyy, h:mm:ss a')}</td>
                                                <td>
                                                    {selectedtableDisplay === 'modification' || selectedtableDisplay === 'deletion' ? (
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent triggering row click
                                                                setExpandedRow(expandedRow === log.log_id ? null : log.log_id); 
                                                            }} 
                                                            className="px-2 py-3 mx-2 my-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                                                        >
                                                            Details
                                                        </button>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        !loading && <p className="text-gray-400">No logs available</p>
                    )}
                </div>

                {/* pagination */}
                {!error ? (<div className="flex justify-center max-w-4xl mt-2 mb-12 w-full ">
                    <div className="flex items-end text-white">
                        Displaying results for&nbsp;<span className="text-orange-300">um_{selectedtableDisplay}_log</span>
                    </div>
                    
                    <div className="flex items-center ml-auto space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                            onClick={() => handlePrevPage()}
                        >
                            {'<'}
                        </button>

                        <div className="px-4 py-2 text-white rounded bg-gray-700 hidden sm:flex">
                            {page} of {totalPages}
                        </div>

                        <button
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                            onClick={() => handleNextPage()}
                        >
                            {'>'}
                        </button>

                        <input
                            type="number"
                            className="ml-2 px-2 py-2 border rounded text-center bg-gray-500 text-white" 
                            min={1}
                            max={totalPages}
                            onChange={handleInputPage}
                        />
                    </div>
                </div>) : null}

                {/* Modal for expanded row */}
                <Modal
                    isOpen={expandedRow !== null}
                    onRequestClose={() => setExpandedRow(null)}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    overlayClassName="fixed inset-0"
                >
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-3xl w-full">
                        {/* Store the result of the find operation in a variable */}
                        {(() => {
                            const selectedLog = logs.find(log => log.log_id === expandedRow);
                            return selectedLog ? (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Log Details</h2>
                                    <p><strong>Log ID:</strong> {selectedLog.log_id}</p>
                                    <p><strong>User ID:</strong> {selectedLog.email}</p>
                                    {/* <p><strong>Site ID:</strong> {selectedLog.site_id}</p> */}
                                    <p><strong>Table Name:</strong> {selectedLog.table_name}</p>
                                    <p><strong>Record ID:</strong> {selectedLog.record_id}</p>
                                    <p><strong>Created At:</strong> {format(new Date(selectedLog.created_at), 'MMMM do, yyyy, h:mm:ss a')}</p>
                                    {selectedtableDisplay === 'modification' || selectedtableDisplay === 'deletion' ? (
                                        <>
                                            <p><strong>Modification ID:</strong> {selectedLog.field_modification_id}</p>
                                            <p><strong>Field Name:</strong> {selectedLog.field_name}</p>
                                            <p><strong>Old Value:</strong></p>
                                            <pre>{JSON.stringify(selectedLog.old_value, null, 4)}</pre>
                                        </>
                                    ) : null}
                                    <button
                                        onClick={() => setExpandedRow(null)}
                                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : null;
                        })()}
                    </div>
                </Modal>

                
            </div>
        </>
    );
};

export default LogsBoard;
