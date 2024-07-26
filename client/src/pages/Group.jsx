import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "../styles/Group.css";

function Group() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("/api/groups")
            .then(response => response.json())
            .then(data => setGroups(data.groups))
            .catch(error => console.error("Error fetching groups:", error))
    });
    return (
        <div className="Group">
            <Navbar />
            <div className="container displayGroups row">

            </div>
        </div>

    );
}

export default Group;
