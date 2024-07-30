// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar.jsx";
// import "../styles/home.css";

// function Home() {
//     const [username, setUsername] = useState("");
//     const [userStats, setUserStats] = useState({
//         // To be changed according to the database
//         totalUsers: 0,
//         activeUsers: 0,
//         newUsers: 0,
//         adminUsers: 0,
//     });

//     useEffect(() => {
//         // To be changed according to the database
//         setUsername("John Doe");
//         setUserStats({
//             totalUsers: 150,
//             activeUsers: 120,
//             newUsers: 10,
//             adminUsers: 5,
//         });
//     }, []);

//     return (
//         <div className="home">
//             <Navbar />
//             <div className="container col-12 full-height center-content">
//                 <div className="row">
//                     <h1 className="welcome-message col-6 p-5 mx-auto">
//                         Welcome, {username}
//                     </h1>
//                     <div className="announcements bg-white col-6 p-5 mx-auto">
//                         <h3>Announcements</h3>
//                         <ul>
//                             {/* Example announcements, replace with dynamic content */}
//                             <li>System maintenance on July 30th.</li>
//                             <li>New feature: Two-factor authentication.</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="container">
//                 <div className="row">
//                     <div className="website-statistics col-lg-6 col-sm-12 bg-white">
//                         <div className="stat-card">
//                             <h3>Total Users</h3>
//                             <p>{userStats.totalUsers}</p>
//                         </div>
//                         <div className="stat-card">
//                             <h3>Active Users</h3>
//                             <p>{userStats.activeUsers}</p>
//                         </div>
//                         <div className="stat-card">
//                             <h3>New Users (Last Month)</h3>
//                             <p>{userStats.newUsers}</p>
//                         </div>
//                         <div className="stat-card">
//                             <h3>Admin Users</h3>
//                             <p>{userStats.adminUsers}</p>
//                         </div>
//                     </div>
//                     <div className="recent-activities col-lg-6 col-sm-12 bg-white">
//                         <h3>Recent Activities</h3>
//                         <ul>
//                             {/* Example activities, replace with dynamic content */}
//                             <li>User John Doe logged in.</li>
//                             <li>Admin Jane Smith updated profile.</li>
//                             <li>New user Michael Johnson registered.</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default Home;

import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";

function Home() {

    const [username, setUsername] = useState("");
    const [userStats, setUserStats] = useState({
        // To be changed according to the database
        totalUsers: 0,
        activeUsers: 0,
        newUsers: 0,
        adminUsers: 0,
    });

    useEffect(() => {
        // To be changed according to the database
        setUsername("John Doe");
        setUserStats({
            totalUsers: 150,
            activeUsers: 120,
            newUsers: 10,
            adminUsers: 5,
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="container flex flex-col min-h-[50vh] items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="justify-center flex flex-col lg:flex-row w-full gap-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 sm:text-4xl lg:text-5xl">
                        Welcome, {username}
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Announcements</h3>
                        <ul className="list-disc pl-5 text-gray-800 space-y-2">
                            {/* Example announcements, replace with dynamic content */}
                            <li>System maintenance on July 30th.</li>
                            <li>New feature: Two-factor authentication.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container my-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/2">
                        <div className="stat-card mb-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Users</h3>
                            <p className="text-lg text-gray-700">{userStats.totalUsers}</p>
                        </div>
                        <div className="stat-card mb-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Users</h3>
                            <p className="text-lg text-gray-700">{userStats.activeUsers}</p>
                        </div>
                        <div className="stat-card mb-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">New Users (Last Month)</h3>
                            <p className="text-lg text-gray-700">{userStats.newUsers}</p>
                        </div>
                        <div className="stat-card text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Users</h3>
                            <p className="text-lg text-gray-700">{userStats.adminUsers}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
                        <ul className="space-y-2">
                            {/* Example activities, replace with dynamic content */}
                            <li className="bg-gray-50 rounded-lg p-3 text-gray-800 shadow-sm">
                                User John Doe logged in.
                            </li>
                            <li className="bg-gray-50 rounded-lg p-3 text-gray-800 shadow-sm">
                                Admin Jane Smith updated profile.
                            </li>
                            <li className="bg-gray-50 rounded-lg p-3 text-gray-800 shadow-sm">
                                New user Michael Johnson registered.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
