import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
    return (
        <header class="sidebar-header" role="banner">
            <h1 class="logo">
                <a>Hello <span>ADMIN</span></a>
            </h1>
            <div class="nav-wrap">
                <nav class="main-nav" role="navigation">a
                    <ul class="unstyled list-hover-slide">
                        <li><Link to="/admin/dashboard"><a>DASHBOARD</a></Link></li>
                        <li><Link to="/admin/profile"><a>PROFILE</a></Link></li>
                        <li><Link to="/admin/all-students"><a>STUDENTS</a></Link></li>
                        <li><Link to="/admin/all-teachers"><a>TEACHERS</a></Link></li>
                        <li><Link to="/admin/all-courses"><a>COURSES</a></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default SideBar
// App.js
// import React from "react";
// import {
//   Sidebar,
//   Menu,
//   MenuItem,
//   useProSidebar,
//   SubMenu,
//   ProSidebarProvider,  // Import ProSidebarProvider
// } from "react-pro-sidebar";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// function AdminSidebar() {
//   const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
//     useProSidebar();

//   const toggle = () => {
//     toggleSidebar();
//     if (toggled) {
//       console.log(true);
//       collapseSidebar();
//     } else {
//       console.log(false);
//       collapseSidebar();
//     }
//   };

//   return (
//     <ProSidebarProvider>  {/* Wrap your component with ProSidebarProvider */}
//       <div
//         id="app"
//         style={({ height: "100vh" }, { display: "flex", flexDirection: "row" })}
//       >
//         <Sidebar  
//           backgroundColor="rgb(0, 249, 249)"
//           rtl={false}
//           style={{ height: "100vh" }}
//         >
//           <Menu>
//             <MenuItem
//               icon={<MenuOutlinedIcon />}
//               onClick={() => {
//                 toggle();
//               }}
//               style={{ textAlign: "center" }}
//             >
//               {" "}
//               <h2>Admin</h2>
//             </MenuItem>

//             <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
//             <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
//             <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
//             <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
//             <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
//             <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>

//             <SubMenu icon={<HomeOutlinedIcon />} label="Home">
//               <MenuItem icon={<PeopleOutlinedIcon />}>Item 1</MenuItem>
//               <MenuItem icon={<PeopleOutlinedIcon />}>Item 2</MenuItem>
//               <MenuItem icon={<PeopleOutlinedIcon />}>Item 3</MenuItem>
//             </SubMenu>
//           </Menu>
//         </Sidebar>
//       </div>
//     </ProSidebarProvider>
//   );
// }

// export default AdminSidebar;


// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// function AdminSidebar() {
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggle = () => {
//     setCollapsed((prevCollapsed) => !prevCollapsed);
//   };

//   return (
//     <div id="app" style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
//       <Sidebar collapsed={collapsed} onToggle={handleToggle} style={{ height: "100vh" }}>
//         <Menu>
//           <MenuItem icon={<MenuOutlinedIcon />} onClick={handleToggle}>
//             <h2>Admin</h2>
//           </MenuItem>
//           <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
//           <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
//           <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
//           <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
//           <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
//           <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
//           <SubMenu icon={<HomeOutlinedIcon />} label="Home">
//             <MenuItem icon={<PeopleOutlinedIcon />}>Item 1</MenuItem>
//             <MenuItem icon={<PeopleOutlinedIcon />}>Item 2</MenuItem>
//             <MenuItem icon={<PeopleOutlinedIcon />}>Item 3</MenuItem>
//           </SubMenu>
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// }

// export default AdminSidebar;
