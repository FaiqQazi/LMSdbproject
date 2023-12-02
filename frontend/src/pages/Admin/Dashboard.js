import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'
import AdminCard from '../../components/Cards/admincard'

const Dashboard = () => {

    // * use navigate 
    const navigate = useNavigate();

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;

    // alert(JSON.stringify(userInfo))

    // * USE EFFECT REDIRECT TO LOG IN 
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        if (userInfo) {

            if (userInfo.is_admin === true) {

            }
            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }, [navigate, userInfo])

    // * ========================
const cards=[
    { name: 'ADD STUDENT', description: '', link: '/admin/add-student' },
    { name: 'UPDATE STUDENT ', description: '', link: '/admin/all-students' },
    { name: 'DELETE STUDENT ', description: '', link: '/admin/all-students' },
    { name: 'VIEW ALL STUDENT', description: '', link: '/admin/all-students' },
    { name: 'ADD TEACHER', description: '', link: '/admin/add-teacher' },
    { name: 'UPDATE TEACHER', description: '', link: '/admin/all-teachers' },
    { name: 'DELETE TEACHER', description: '', link: '/admin/all-teachers' },
    { name: 'VIEW ALL TEACHER', description: '', link: '/admin/all-teachers' },
    { name: 'ADD COURSE', description: '', link: '/admin/add-course' },
    { name: 'UPDATE COURSE', description: '', link: '/admin/all-courses' }, 
    { name: 'DELETE COURSE', description: '', link: '/admin/all-courses' },
    { name: 'VIEW ALL COURSES', description: '', link: '/admin/all-courses' },
]
    return (
        <div>
      <Header />
      <AdminSideBar />

      <div className="dashboard-container">
        <div className="row">
          {cards.map((card, index) => (
            <div className="column" key={index}>
              <AdminCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}

export default Dashboard
