import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';

const LogsBoard = () => {

    // config
    const logsPerPage = 10;

    // declaration
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const navigate = useNavigate();
    const query = useQuery();
    const page = parseInt(query.get('page')) || 1;
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const totalPages = Math.ceil(logs.length / logsPerPage);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/creation/viewAll', {
                params: {
                    limit: page * logsPerPage,
                    offset: page * logsPerPage - logsPerPage
                }
            });
            setLogs(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Error fetching logs. Please try again.');
            console.error('Error fetching logs:', error);
        }
    };


    const handleNextPage = () => {
        console.log(totalPages);
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


    useEffect(() => {
        fetchLogs();
    }, [page]);

    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
                <h1 className="text-6xl font-extrabold text-white mb-4">
                    Log <span className="text-green-600">Board</span>
                </h1>

                <p className="text-lg text-gray-300">
                    hi guys im working on pagination. i deleted rafael code cause i like to start from scratch. please refer to previous commits to look at previous code.
                </p>

                {/* fetch data */}
                <div className="flex justify-between items-center w-11/12 max-w-4xl mb-4 mt-4">
                    {error && (
                        <div className="text-red-500">
                        {error}
                        <button
                            onClick={fetchLogs}
                            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                        >
                            Retry
                        </button>
                        </div>
                    )}
                    {!error && (
                        <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                        >
                        Refresh
                        </button>
                    )}

                    <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 active:bg-indigo-700"
                    >
                        Filter
                    </button>
                </div>

                {/* table */}
                <div className="w-11/12 max-w-4xl " style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {logs.length > 0 ? (
                        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
                            <table className="min-w-full bg-gray-700 text-white rounded" style={{ tableLayout: 'fixed' }}>
                                <thead className="sticky top-0 bg-gray-700 shadow-md">
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-600">Log ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">User ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Site ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Table Name</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Record ID</th>
                                        <th className="py-2 px-4 border-b border-gray-600">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => (
                                        <tr key={log.log_id}>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.log_id}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.user_id}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.site_id}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.table_name}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.record_id}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{log.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        !error && <p className="text-gray-400">No logs available</p>
                    )}
                </div>
                
                {/* pagination */}
                <div className="flex justify-center max-w-4xl mt-2 mb-12 w-full ">
                    <div className="flex items-center ml-auto space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                            onClick={() => handlePrevPage()}
                        >
                            {'<'}
                        </button>

                        <div className="px-4 py-2 text-white rounded bg-gray-700">
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
                            className="ml-2 w-16 px-2 py-2 border rounded text-center bg-gray-500 text-white"
                            min={1}
                            max={totalPages}
                        />
                    </div>
                    </div>


            </div>
        </>
    );
};

export default LogsBoard;