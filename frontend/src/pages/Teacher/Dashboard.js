import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import TeacherSideBar from '../../components/SideBar/TeacherSideBar'
import Header from '../../components/Header/Header'
import axios from 'axios';
import Studentcoursecard from '../../components/Cards/studentcoursecard';

const Dashboard = () => {
    const [teacherCourse, setteacherCourse] = useState([]);

    // * use navigate 
    const navigate = useNavigate();
    const params = useParams();
    const teacher_id = params._id;


    // * ==== get user state 
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo, message } = adminLogin;


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

    // * ========================
    const getteacherCourses = async () => {
        try {
          const data = await axios.get(`http://localhost:5000/api/course/getteachercourses/${teacher_id}`);
          setteacherCourse(data.data.response);
        } catch (error) {
          // Handle the error
        }
      };
      useEffect(() => {
        getteacherCourses();
      }, []);



    return (
        <div>
            <Header />
            <TeacherSideBar />
             <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {teacherCourse.map((course) => (
            <div key={course.course_id} style={{ flexBasis: '30%' }}>
              <Studentcoursecard
                name={course.course_name}
                description={course.course_desc}
                _id={course._id}
                teacher_id={teacher_id}
              />
            </div>
          ))}
        </div>
        </div>
    )
}

export default Dashboard
