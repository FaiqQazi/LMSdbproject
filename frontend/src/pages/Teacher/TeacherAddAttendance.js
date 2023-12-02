import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import TeacherCreateAttendanceForm from '../../components/Forms/TeacherCreateAttendanceForm'
import Attendencecard from '../../components/Cards/teacherattendencecard'
import axios from 'axios';


const TeacherAddAttendance = () => {
    

    // * ======================== authentication
    const navigate = useNavigate();
    const[teacherCourse,setteacherCourse]=useState([])

    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;

  const getteacherCourses = async () => {
        try {
          const data = await axios.get(`http://localhost:5000/api/course/getteachercourses/${userInfo._id}`);
          setteacherCourse(data.data.response);
        } catch (error) {
          // Handle the error
        }
      };
      useEffect(() => {
        getteacherCourses();
      }, []);
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
        getteacherCourses();
    }, [navigate, userInfo])
   


    // * ======================== authentication

    return (
        <div>
            <Header />
            <TeacherSideBar />
            {/* <TeacherCreateAttendanceForm /> */}
            <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {teacherCourse.map((course) => (
            <div key={course.course_id} style={{ flexBasis: '30%' }}>
              <Attendencecard
                name={course.course_name}
                description={course.course_desc}
                _id={course._id}
                // teacher_id={teacher_id}
              />
            </div>
          ))}
        </div>

        </div>
    )
}

export default TeacherAddAttendance
