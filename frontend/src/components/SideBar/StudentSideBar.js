// import React from 'react'
// import { Link } from 'react-router-dom'
// import './SideBar.css'

// const StudentSideBar = () => {
//     return (
//         <header class="sidebar-header" role="banner">
//             <h1 class="logo">
//                 <a>Hello <span>STUDENT</span></a>
//             </h1>
//             <div class="nav-wrap">
//                 <nav class="main-nav" role="navigation">
//                     <ul class="unstyled list-hover-slide">
//                         <li><Link to="/student/dashboard"><a>DASHBOARD</a></Link></li>
//                         <li><Link to="/student/profile"><a>PROFILE</a></Link></li>
//                         <li><Link to="/student/courses"><a>COURSES</a></Link></li>
//                         <li><Link to="/student/attendance"><a>ATTENDANCE</a></Link></li>
//                         <li><Link to="/student/marks"><a>MARKS</a></Link></li>
//                     </ul>
//                 </nav>
//             </div>
//         </header>
//     )
// }

// export default StudentSideBar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const StudentSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
      <header className="sidebar-header" role="banner">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="logo">
          <a>
            Hello <span>STUDENT</span>
          </a>
        </h1>
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li>
                <Link to="/student/dashboard">
                  <a>DASHBOARD</a>
                </Link>
              </li>
              <li>
                <Link to="/student/profile">
                  <a>PROFILE</a>
                </Link>
              </li>
              <li>
                <Link to="/student/courses">
                  <a>COURSES</a>
                </Link>
              </li>
              <li>
                <Link to="/student/attendance">
                  <a>ATTENDANCE</a>
                </Link>
              </li>
              <li>
                <Link to="/student/marks">
                  <a>MARKS</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default StudentSideBar;
