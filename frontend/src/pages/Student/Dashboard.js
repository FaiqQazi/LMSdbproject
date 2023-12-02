// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux'
// import StudentSideBar from '../../components/SideBar/StudentSideBar'
// import Header from '../../components/Header/Header'
// //import { get } from 'mongoose';
// import axios from 'axios';
// import Studentcoursecard from '../../components/Cards/studentcoursecard'
// const Dashboard = () => {

//     // * use navigate 
//     const [course,setcourse]=useState([]);
//     const [studentcourse,setstudentcourse]=useState([]);
//     const navigate = useNavigate();
//     const params = useParams();
//     const student_id=params._id;
//     // * ==== get user state 
//     const adminLogin = useSelector((state) => state.adminLogin)
//     const { loading, error, userInfo, message } = adminLogin;

//    // alert(JSON.stringify(userInfo))

//     // * USE EFFECT REDIRECT TO LOG IN 
//     useEffect(() => {
//         if (!userInfo) {
//             navigate("/");
//         }
//         if (userInfo) {

//             if (userInfo.is_student === true) {

//             }
//             else {
//                 navigate("/");
//             }
//         }
//         else {
//             navigate("/");
//         }
//     }, [navigate, userInfo])

//   //   const getallstudentcourses = async () => {
//   //     try {
//   //       console.log(student_id)
//   //         const data = await axios.get( // Change method to POST and send data in the request body
//   //             'http://localhost:5000/api/course/getassignedcoursetostudent',
//   //             { student_id: student_id } // Change this line
//   //         );
//   //         setstudentcourse(data.data.response);
//   //         console.log(studentcourse);
//   //     } catch (error) {
//   //         // Handle the error
//   //     }
//   // }
//   const getallstudentcourses = async () => {
//     try {
//         console.log(student_id);
//         const data = await axios.get(
//             `http://localhost:5000/api/course/getassignedcoursetostudent/${student_id}`
//         );
//         setstudentcourse(data.data.response);
//         console.log(studentcourse);
//     } catch (error) {
//         // Handle the error
//     }
// };
  
//     const getallcourses = async () => {

//         try{
//             const data = await axios.get(
//                 `http://localhost:5000/api/courses/getallcourses`,
//             )
//             setcourse(data.data.response)
//             console.log(course);
//                         // setLoading(false)
//         }
//         catch
//         {
//            // alert(error);
//         }
//     }
//     useEffect(() => {
//         getallstudentcourses();
//         getallcourses();
//     },[]);

//     const assigncourse=async(course_id,student_id)=>
//     {
//         try{
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//             const data = await axios.post(`http://localhost:5000/api/courses/assigncoursetostudent/${course_id}/${student_id}`,config);
//             console.log(data);
            
//                 alert("Course Assigned Successfully");
//                 console.log("Course Assigned Successfully")
//                 getallstudentcourses();
//                 navigate(`/student/dashboard/${student_id}`);
            
        
//         }
//         catch(error)
//         {
//             console.log("problem in the assign course route");
//         }
//     }
//     const centeredHeadingStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh', // This makes the container take the full height of the viewport
//       };
    
//       const headingStyle = {
//         fontSize: '2em', // You can adjust the font size as needed
//       };

//     // * ========================

//     return (
//         <div>
        
//     {/* <div style={centeredHeadingStyle}>
//       <h1 style={headingStyle}>Your Courses</h1>
//     </div> */}
//             <Header />
//             <StudentSideBar />
//             <div className="dashboard-container" style={{ textAlign: 'center' }}>
//     <h1 style={headingStyle}>Your Courses</h1>

//     <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
//         {studentcourse.map((course) => (
//             <Studentcoursecard
//                 key={course.course_id}
//                 name={course.course_name}
//                 description={course.course_desc}
//                 _id={course._id}
//                 // Add other props as needed
//             />
//         ))}
//     </div>
// </div>

        
//     {/* <div className="dashboard-container"> */}
//     <div className="dashboard-container" style={{ textAlign: 'center' }}>
//   <h1 style={headingStyle}>All Courses</h1>

//   <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
//     {course.map((course) => (
//       <div key={course.course_id} style={{ flexBasis: '30%' }}>
//         <Studentcoursecard
//           name={course.course_name}
//           description={course.course_desc}
//           _id={course._id}
//           student_id={student_id}
//           // Add other props as needed
//         />
//       </div>
//     ))}
//   </div>
// </div>



//         {/* </div> */}
//         </div>
//     )
// }

// export default Dashboard

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StudentSideBar from '../../components/SideBar/StudentSideBar';
import Header from '../../components/Header/Header';
import axios from 'axios';
import Studentcoursecard from '../../components/Cards/studentcoursecard';

const Dashboard = () => {
  const [course, setCourse] = useState([]);
  const [studentCourse, setStudentCourse] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const student_id = params._id;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { userInfo } = adminLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.is_student) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const getStudentCourses = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/api/course/getassignedcoursetostudent/${student_id}`);
      setStudentCourse(data.data.response);
    } catch (error) {
      // Handle the error
    }
  };

  const getAllCourses = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/api/courses/getallcourses`);
      setCourse(data.data.response);
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    getStudentCourses();
    getAllCourses();
  }, [student_id]);

  useEffect(() => {
    // Filter courses based on search query
    const filtered = course.filter((c) =>
      c.course_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourse(filtered);
  }, [course, searchQuery]);

  const assignCourse = async (course_id, student_id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(`http://localhost:5000/api/courses/assigncoursetostudent/${course_id}/${student_id}`, config);
      alert('Course Assigned Successfully');
      getStudentCourses();
      navigate(`/student/dashboard/${student_id}`);
    } catch (error) {
      console.log('Problem in the assign course route', error);
    }
  };

  const centeredHeadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const headingStyle = {
    fontSize: '2em',
  };

  return (
    <div>
      <Header />
      <StudentSideBar />

      <div className="dashboard-container" style={{ textAlign: 'center' }}>
        <h1 style={headingStyle}>Your Courses</h1>

        <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {studentCourse.map((course) => (
            <Studentcoursecard
              key={course.course_id}
              name={course.course_name}
              description={course.course_desc}
              _id={course._id}
            />
          ))}
        </div>
      </div>

      <div className="dashboard-container" style={{ textAlign: 'center' }}>
        <h1 style={headingStyle}>All Courses</h1>

        <input
          type="text"
          placeholder="Search by Course Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {filteredCourse.map((course) => (
            <div key={course.course_id} style={{ flexBasis: '30%' }}>
              <Studentcoursecard
                name={course.course_name}
                description={course.course_desc}
                _id={course._id}
                student_id={student_id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
