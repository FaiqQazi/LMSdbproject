// import React, { useState, useEffect } from 'react'
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios'
// import './Table.css'

// const AdminCourseTable = () => {

//     // * Use State
//     const [loading, setLoading] = useState(true)
//     const [courses, setCourses] = useState([])
//     // let [year, setYear] = useState(1);
//     // let [semester, setSemester] = useState(1);

//     // * REACT HOOK FORM 
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = async data => {
//         // let year = parseInt(data.year);
//         // let semester = parseInt(data.semester);
//         //console.log(year, semester)
//         // setYear(year);
//         // setSemester(semester);
//     }
// const Navigate=useNavigate();
//     // * Get Courses
//     const getAllCourses = async () => {

//         try {
//             const data = await axios.get(
//                 `http://localhost:5000/api/courses/getallcourses`,
//             )
//             setCourses(data.data.response)
//             setLoading(false)
//         console.log(courses);
//         } catch (error) {
//             // alert(error)
//         }
//     }
//     const handleedit=()=>
//     {

//     }
//     const handledelete=async(courseid)=>
//     {
// try{
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }
//     // const data = await axios.delete(`https://localhost:5000/api/course/${courseid}`,config);
//     console.log("Deleting course with ID:", courseid);
//     const data = await axios.delete(`http://localhost:5000/api/course/${courseid}`, config);
//     console.log(data);
//     if(data.data.status==="success")
//     {
//         // alert("Course Deleted Successfully");
//         console.log("Course Deleted Successfully")
//         getAllCourses();
//         Navigate("/admin/all-courses")
//     }

// }
// catch(error)
// {
//     console.log("problem in the delete course route");
// }
//     };
   

//     useEffect(() => {
//         getAllCourses();
//     }, [loading])

//     return (
//         <div className="table-container">
//             {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}
//             <Link className="add-btn" to="/admin/add-course">ADD COURSE</Link>

//             {/* <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="dashboard-container">
//                     <div class="row">
//                         <div class="column">
//                             <label>YEAR</label>
//                             <select name="year"
//                                 {...register("year")}
//                             >
//                                 <option value="1">1</option>
//                                 <option value="2">2</option>
//                                 <option value="3">3</option>
//                                 <option value="4">4</option>
//                             </select>
//                         </div>

//                         <div class="column">
//                             <label>SEMESTER</label>
//                             <select name="semester"
//                                 {...register("semester")}
//                             >
//                                 <option value="1">1</option>
//                                 <option value="2">2</option>
//                             </select>
//                         </div>
//                         <div class="column">
//                             <input style={{ margin: "20px" }} type="submit" value="FILTER" />
//                         </div>
//                     </div>
//                 </div>
//             </form> */}

            
//                     <table>
//                         <tr>
//                             <th>course id</th>
//                             <th>course name</th>
//                             <th>course year</th>
//                             <th>course semester</th>
//                             <th>enrollment code</th>
//                             <th>Status</th>
//                             <th>Course Description</th>
//                             <th>Assigned Teacher</th>
//                             {/* <th>VIEW</th> */}
//                         </tr>
//                         {courses.map((course, key) => {
//                             return (
//                                 <tr key={key}>
//                                     <td>{course.course_id}</td>
//                                     <td>{course.course_name}</td>
//                                     <td>{course.course_year}</td>
//                                     <td>{course.course_semester}</td>
//                                     <td>{course.enrollment_code}</td>
//                                     <td>{course.status}</td>
//                                     <td>{course.course_desc}</td>
//                                     <td>{course.course_assigned_teacher.teacher_cnic}</td>
//                                     {/* <td><button  className="table-edit-btn">EDIT</button></td> */}
//                                     <td><Link to={`/admin/edit/course/${course._id}`} className="table-edit-btn" >EDIT</Link></td>
//                                     <td><button className="table-delete-btn"  onClick={() => handledelete(course._id)}>DELETE</button></td>
                                    

//                                 </tr>
//                             )
//                         })}
//                     </table>
                
//         </div>
//     )
// }

// export default AdminCourseTable
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Table.css';

const AdminCourseTable = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const Navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      const data = await axios.get(
        'http://localhost:5000/api/courses/getallcourses'
      );
      setCourses(data.data.response);
      setLoading(false);
      console.log(courses);
    } catch (error) {
      // alert(error)
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log('Deleting course with ID:', courseId);
      const data = await axios.delete(
        `http://localhost:5000/api/course/${courseId}`,
        config
      );
      console.log(data);
      if (data.data.status === 'success') {
        console.log('Course Deleted Successfully');
        getAllCourses();
        Navigate('/admin/all-courses');
      }
    } catch (error) {
      console.log('Problem in the delete course route');
    }
  };

  const handleSearch = (data) => {
    setSearchTerm(data.searchTerm);
  };

  useEffect(() => {
    getAllCourses();
  }, [loading]);

  // Filter courses based on the search term
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <Link className="add-btn" to="/admin/add-course">
        ADD COURSE
      </Link>
      <div style={{ marginTop: '20px' }}>
    {/* Content of the div */}
  </div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          type="text"
          placeholder="Search by course name"
          {...register('searchTerm')}
        />
        <button type="submit">Search</button>
      </form>

      <table>
        <tr>
          <th>course id</th>
          <th>course name</th>
          <th>course year</th>
          <th>course semester</th>
          <th>enrollment code</th>
          <th>Status</th>
          <th>Course Description</th>
          <th>Assigned Teacher</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
        {filteredCourses.map((course, key) => {
          return (
            <tr key={key}>
              <td>{course.course_id}</td>
              <td>{course.course_name}</td>
              <td>{course.course_year}</td>
              <td>{course.course_semester}</td>
              <td>{course.enrollment_code}</td>
              <td>{course.status}</td>
              <td>{course.course_desc}</td>
              <td>{course.course_assigned_teacher.teacher_cnic}</td>
              <td>
                <Link
                  to={`/admin/edit/course/${course._id}`}
                  className="table-edit-btn"
                >
                  EDIT
                </Link>
              </td>
              <td>
                <button
                  className="table-delete-btn"
                  onClick={() => handleDelete(course._id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AdminCourseTable;
