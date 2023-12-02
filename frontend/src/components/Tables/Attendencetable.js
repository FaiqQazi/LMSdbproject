import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Table.css'

const AttendenceTable = (props) => {

    // * Use State
    const [loading, setLoading] = useState(true)
    // const [courses, setCourses] = useState([])
    const [records, setRecords] = useState([]);
    const course_id=props.course_id;
    // let [year, setYear] = useState(1);
    // let [semester, setSemester] = useState(1);

    // * REACT HOOK FORM s
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // let year = parseInt(data.year);
        // let semester = parseInt(data.semester);
        //console.log(year, semester)
        // setYear(year);
        // setSemester(semester);
    }
const Navigate=useNavigate();
    // * Get Courses
    const getattendencebycourse = async () => {
        const data1=await axios .post(`http://localhost:5000/api/attendence/createattendence`);
        try {
            console.log(course_id);
            const data = await axios.get(
                `http://localhost:5000/api/attendence/getattendenceforcourse/${course_id}`
            );
            setRecords(data.data.attendanceRecords);
            console.log(records); // Assuming 'attendanceRecords' is the correct property name in the response
            setLoading(false)
        } catch (error) {
            // alert(error)
        }
    }
    const createattendence = async (data) => {

    }

    
    const handlepress = async (course_id, student_id, isPresent,date) => {
        console.log("the student_id , course_id , present");
        console.log(course_id, student_id, isPresent)
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      
          const data = await axios.post(
            'http://localhost:5000/api/attendence/markpresent',
            {
                course_id,
              student_id,
             
              isPresent,
              date,
            },
            config
          );
      
          console.log(data);
      
          // Optionally, you can check the response status and show a success message
          if (data.status === 200 && data.data.success) {
            // alert('Attendance marked successfully');
          } else {
            // alert('Failed to mark attendance');
          }
      
          // Reload the attendance records after marking attendance
          getattendencebycourse();
        } catch (error) {
          console.log('Problem in the route', error);
        }
      };
      
   

    useEffect(() => {
        // getAllCourses();
        getattendencebycourse();
    }, [loading])

    return (
        <div className="table-container">
            {/* <Link className="add-btn" to="/admin/add-student">COURSES</Link> */}
            {/* <Link className="add-btn" to="/admin/add-course">ADD COURSE</Link> */}

            
            
                    <table>
                        <tr>
                            <th>student id</th>
                            <th>course id</th>
                            <th>date</th>
                            <th>attendence</th>
                           
                            {/* <th>VIEW</th> */}
                        </tr>
                        {/* {records.map((record, key) => {
                            return (
                                <tr key={key}>
                                    <td>{record.attendence_course}</td>
                                    <td>{record.attendence_student}</td>
                                    <td>{record.date}</td>
                                    <td>{record.isPresent}</td>
                                    
                                    <td><button className="table-delete-btn"  onClick={() => handlepress(record.course_id,record.student_id,record.isPresent)}>present</button></td>
                                    <td><button className="table-delete-btn"  onClick={() => handlepress(record.course_id,record.student_id,record.isPresent)}>absent</button></td>
                                    

                                </tr>
                            )
                        })} */}
                        {records.map((record, key) => {
                            console.log(record);
    return (
        <tr key={key}>
            <td>{record.course_name}</td>
            <td>{`${record.student_first_name} ${record.student_last_name}`}</td>
            <td>{record.student_cnic}</td>
            <td>{record.date}</td>
            <td>{record.isPresent}</td>
            
            <td>
                <button className="table-delete-btn" onClick={() => handlepress(record.course_id, record.student_id, "present",record.date)}>
                    Present
                </button>
            </td>
            <td>
                <button className="table-delete-btn" onClick={() => handlepress(record.course_id, record.student_id, "absent",record.date)}>
                    Absent
                </button>
            </td>
        </tr>
    );
})}

                    </table>
                
        </div>
    )
}

export default AttendenceTable
