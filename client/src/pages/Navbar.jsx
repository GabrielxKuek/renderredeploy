// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Offcanvas, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../styles/navbar.css';

// const Navbar = () => {
//     const [show, setShow] = React.useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <div className="navbar">
//             <Button variant="primary" onClick={handleShow} className="mb-3">
//                 <i className="bi bi-list"></i>
//             </Button>

//             <Offcanvas show={show} onHide={handleClose} className="bg-dark text-white custom-close-button">
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title className="header-title display-4 display-md-3 display-sm-2">Auth INC</Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     <ul className="nav flex-column">
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/" onClick={handleClose}>Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/user-management" onClick={handleClose}>User Management</Link>
//                         </li>
//                         <li className="nav-item position-relative">
//                             <Link className="nav-link text-white" to="/site" onClick={handleClose}>
//                                 Site
//                             </Link>
//                             <button className="subnavbtn">About <i class="fa fa-caret-down"></i></button>
//                             <div className="subnav-content">
//                                 <ul className="sub-navbar nav flex-column">
//                                     <li className="nav-item">
//                                         <Link className="nav-link text-white" to="/site/user" onClick={handleClose}>User</Link>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link className="nav-link text-white" to="/site/group" onClick={handleClose}>Group</Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/settings" onClick={handleClose}>Settings</Link>
//                         </li>
//                     </ul>
//                 </Offcanvas.Body>
//             </Offcanvas>
//         </div>
//     );
// };

// export default Navbar;

import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="navbar overflow-hidden">
      <Button variant="primary" onClick={handleShow} className="mb-3">
        <i className="bi bi-list"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="bg-dark text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-2xl text-white font-mono border-r-2 border-white whitespace-nowrap m-0 tracking-wide overflow-hidden animate-typing animate-blink-caret">
            Auth INC
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-col space-y-1">
            <li className="nav-item">
              <Link className="nav-link text-white hover:bg-gray-700 p-2 text-base" to="/" onClick={handleClose}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white hover:bg-gray-700 p-2 text-base" to="/user-management" onClick={handleClose}>User Management</Link>
            </li>
            <li className="nav-item relative group">
              <Link className="nav-link text-white hover:bg-gray-700 p-2 text-base" to="/site" onClick={handleClose}>
                Site
              </Link>
              <button className="nav-link text-white hover:bg-gray-700 p-2 text-base w-full text-left">
                About <i className="fa fa-caret-down ml-2"></i>
              </button>
              <div className="subnav-content hidden group-hover:block absolute bg-gray-800 text-white z-10 mt-0 w-full top-full">
                <ul className="sub-navbar nav flex-col space-y-1">
                  <li className="nav-item">
                    <Link className="nav-link text-white hover:bg-gray-400" to="/site/user" onClick={handleClose}>User</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white hover:bg-gray-400" to="/site/group" onClick={handleClose}>Group</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white hover:bg-gray-700 p-2 text-base" to="/settings" onClick={handleClose}>Settings</Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Navbar;



