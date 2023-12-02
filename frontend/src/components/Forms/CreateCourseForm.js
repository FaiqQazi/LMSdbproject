import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Form.css'

const CreateCourseForm = () => {

    // * use navigate 
    const navigate = useNavigate();

    // * USE EFFECT REDIRECT TO DASH BOARD 
    useEffect(() => {

    }, [])

    // * ========================

    // * REACT HOOK FORM 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {


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
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const data = await axios.post(
                'http://localhost:5000/api/courses/createcourse',
                formData,
                config
            )

            console.log(data)
            if (data) {
                navigate("/admin/all-courses");
            } else {

            }

        } catch (error) {

        }
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="container">
            <h1><b>ADD COURSE</b></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
               
               {/* //* FIRST NAME */}
               <label>COURSE ID</label>
                <input type="text" name="course_id" placeholder="course id ..."
                    {...register("course_id", { required: true })}
                />
                <div className="error">{errors.course_id && <span>This field is required</span>}</div>
                {/* //* FIRST NAME */}
                <label>COURSE NAME</label>
                <input type="text" name="course_name" placeholder="course name ..."
                    {...register("course_name", { required: true })}
                />
                <div className="error">{errors.course_name && <span>This field is required</span>}</div>
                {/* //* LAST NAME */}
                <label>COURSE DESCRIPTION</label>
                <input type="text" name="course_desc" placeholder="course description..."
                    {...register("course_desc", { required: true })}
                />
                <div className="error">{errors.course_desc && <span>This field is required</span>}</div>
                {/* //* EMAIL */}
                <label for="fname">COURSE YEAR</label>
                <input type="text" name="course_year" placeholder="course year..."
                    {...register("course_year", { required: true })}
                />
                <div className="error">{errors.course_year && <span>This field is required</span>}</div>
                {/* //* CNIC */}
                <label>CNIC</label>
                <input type="text" name="cnic" placeholder="cnic ..."
                    {...register("teachercnic", { required: true })}
                />
                <div className="error">{errors.teachercnic && <span>This field is required</span>}</div>
                {/* //* INTER MARKS */}
                <label>Semester </label>
                <input type="text" name="course_semester" placeholder="semester"
                    {...register("course_semester", { required: true })}
                />
                <div className="error">{errors.course_semester && <span>This field is required</span>}</div>
                {/* //* PHONE NUMBER */}
                <label>Status</label>
                <input type="text" name="status" placeholder="true or false..."
                    {...register("status", { required: true })}
                />
                <div className="error">{errors.status && <span>This field is required</span>}</div>
                {/* //* DOMICILE */}
                <label>ENROLLMENT CODE</label>
                <input type="text" name="enrollment_code" placeholder="enrollment code ..."
                    {...register("enrollment_code", { required: true })}
                />
                <div className="error">{errors.enrollment_code && <span>This field is required</span>}</div>
                {/* //* password */}
                {/* <label for="lname">PASSWORD</label>
                <input type="password" name="password" placeholder="Your Password ..."
                    {...register("password", { required: true })}
                />
                <div className="error">{errors.password && <span>This field is required</span>}</div> */}

                {/* //* GENDER */}
                {/* <label>GENDER</label>
                <select name="gender"
                    {...register("gender")}
                >
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                    <option value="others">OTHERS</option>
                </select> */}

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}

export default CreateCourseForm
