import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import NavBarReyes from '../components/navBar';
import NavBarGroup1 from "./Navbar.jsx";

const logsSomething = () => {
    return (
        <>
            <NavBarGroup1 />
            <NavBarReyes />

            <div className="logsSomething">
                I dont really know what to put here
            </div>
        </>
    );
}

export default logsSomething;