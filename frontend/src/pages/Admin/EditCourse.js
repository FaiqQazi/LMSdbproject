import AdminSideBar from '../../components/SideBar/AdminSideBar'
import Header from '../../components/Header/Header'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../components/Forms/Form.css";
const EditCourse = () => {
    let params = useParams();

    let id = params._id

    // * Use State
    const [course, setCourse] = useState(null)
    const [Loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const getcourse=async(id)=>
    {
const data=await axios .get(`http://localhost:5000/api/course/${id}`);
setCourse(
    {
        course_name: data.data.response.course_name,
        course_desc: data.data.response.course_desc,
        course_year: data.data.response.course_year,
        course_semester: data.data.response.course_semester,
        teachercnic: data.data.response.course_assigned_teacher.teacher_cnic,
        status: data.data.response.status,
        enrollment_code: data.data.response.enrollment_code,
        course_id: data.data.response.course_id,
    }
   

)


    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm(
        {
            // defaultValue: teachers
        }
    );
   
    useEffect(() => {
        getcourse(id)
        setLoading(false);
    }, [])

const onSubmit=async(data)=>
{
    let formData = {
          
        course_name: data.course_name,
        course_desc:data.course_desc,
        course_year:data.course_year,
        course_semester:data.course_semester,
        teachercnic:data.teachercnic,
        status:data.status,
        enrollment_code:data.enrollment_code,
        course_id:data.course_id
    }
    

console.log(formData);
try{
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const data = await axios.put(`http://localhost:5000/api/course/update/${id}`,formData,config);
    console.log(data.response);
    if(data.data.status==="success")
    {
        alert("Course Updated Successfully");
        console.log("Course Updated Successfully")
        getcourse(id);
        navigate("/admin/all-courses")
    }
}

catch(error)
{
    alert(error);
}
}


    return (
        <div className="container">
            <h1><b>EDIT COURSE</b></h1>

            {Loading ? <>Loading ...</> : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>COURSE ID</label>
                    <input type="text" name="course_id" {...register('course_id')} defaultValue={course.course_id} autoFocus />
                    <div className="error">{errors.course_id && <span>This field is required</span>}</div>

                    <label>COURSE NAME</label>
                    <input type="text" name="course_name" {...register('course_name')} defaultValue={course.course_name} />
                    <div className="error">{errors.course_name && <span>This field is required</span>}</div>

                    <label>COURSE DESCRIPTION</label>
                    <input type="text" name="course_desc" {...register('course_desc')} defaultValue={course.course_desc} />
                    <div className="error">{errors.course_desc && <span>This field is required</span>}</div>

                    <label>COURSE YEAR</label>
                    <input type="text" name="course_year" {...register('course_year')} defaultValue={course.course_year} />
                    <div className="error">{errors.course_year && <span>This field is required</span>}</div>

                    <label>COURSE SEMESTER</label>
                    <input type="text" name="course_semester" {...register('course_semester')} defaultValue={course.course_semester} />
                    <div className="error">{errors.course_semester && <span>This field is required</span>}</div>

                    <label>TEACHER CNIC</label>
                    <input type="text" name="teachercnic" {...register('teachercnic')} defaultValue={course.teachercnic} />
                    <div className="error">{errors.teachercnic && <span>This field is required</span>}</div>

                    <label>STATUS</label>
                    <input type="text" name="status" {...register('status')} defaultValue={course.status} />
                    <div className="error">{errors.status && <span>This field is required</span>}</div>

                    <label>ENROLLMENT CODE</label>
                    <input type="text" name="enrollment_code" {...register('enrollment_code')} defaultValue={course.enrollment_code} />
                    <div className="error">{errors.enrollment_code && <span>This field is required</span>}</div>

                    <input type="submit" value="Update" />
                </form>
            )}
        </div>
    )

}
export default EditCourse;
