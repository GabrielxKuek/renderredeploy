import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from './Navbar.jsx';

const LogsBoard = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/s/2/creation/viewAll');
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
                    Log <span className="text-green-600">Board</span>
                </h1>

                <p className="text-lg text-gray-300">
                    hi teacher, this is a lot of hardcode. just wanted to have a proof-of-concept first. <br/>
                    pagination not yet sorted. so many problems with backend. still manageable.
                    this is simulating data for um_creation_log. <br/>
                    will make this dynamic asap
                </p>

                <div className="mt-8 w-11/12 max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        {error && (
                            <div className="text-red-500">
                                {error}
                                <button 
                                    onClick={fetchLogs} 
                                    className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        {!error && (
                            <button 
                                onClick={fetchLogs} 
                                className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded"
                            >
                                Refresh
                            </button>
                        )}
                    </div>
                    {logs.length > 0 ? (
                        <table className="min-w-full bg-gray-700 text-white rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Log ID</th>
                                    <th className="py-2 px-4 border-b">User ID</th>
                                    <th className="py-2 px-4 border-b">Site ID</th>
                                    <th className="py-2 px-4 border-b">Table Name</th>
                                    <th className="py-2 px-4 border-b">Record ID</th>
                                    <th className="py-2 px-4 border-b">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.log_id}>
                                        <td className="py-2 px-4 border-b">{log.log_id}</td>
                                        <td className="py-2 px-4 border-b">{log.user_id}</td>
                                        <td className="py-2 px-4 border-b">{log.site_id}</td>
                                        <td className="py-2 px-4 border-b">{log.table_name}</td>
                                        <td className="py-2 px-4 border-b">{log.record_id}</td>
                                        <td className="py-2 px-4 border-b">{log.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !error && <p className="text-gray-400">No logs available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default LogsBoard;
