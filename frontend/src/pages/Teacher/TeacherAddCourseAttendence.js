import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import TeacherCreateAttendanceForm from '../../components/Forms/TeacherCreateAttendanceForm'
import Attendencecard from '../../components/Cards/teacherattendencecard'
import Attendencetable from '../../components/Tables/Attendencetable'
import axios from 'axios';

const TeacherAddCourseAttendance = () => {

    // * ======================== authentication
    const navigate = useNavigate();
    const[teacherCourse,setteacherCourse]=useState([])
    const params = useParams();
    const course_id = params._id;

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

            if (userInfo.is_teacher === true) {

            }
            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }, [navigate, userInfo])
    


    // * ======================== authentication

    return (
        <div>
            <Header />
            <TeacherSideBar />
            <Attendencetable course_id={course_id} />
        </div>
    )

        
}

export default TeacherAddCourseAttendance
