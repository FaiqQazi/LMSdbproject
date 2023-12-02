import asyncHandler from "express-async-handler";
import Course from "../../models/course/course.js";
import Teacher from "../../models/teacher/teacher.js";
import Student from "../../models/student/student.js";
import Courseandstudent from "../../models/courseandstudent/courseandstudent.js";
import mongoose from "mongoose";

// * =========================================================== //
const getallcourses=asyncHandler(async(req,res)=>{
    try{
        const courses=await Course.find({}).populate('course_assigned_teacher', 'teacher_cnic');
        res.status(200).json({
            status: "success",
            message: "courses",
            response: courses,
        });
    }
    catch(error){
        res.status(404).json({
            status: "fail",
            message: "courses not found",
            response: error,
        });
    }
});

// * @desc    Fetch all course
// * @route   GET /api/course
// * @access  Public
// const getAllCourse = asyncHandler(async (req, res) => {
//     // const { year, semester } = req.params;

//     try {
//         let year = parseInt(req.params.year);
//         let semester = parseInt(req.params.semester);

//         const data = await CourseModel.find({
//             $and: [
//                 { course_year: year },
//                 { course_semester: semester }
//             ]
//         })
//             .sort("-createdAt")

//         res.status(201).json({
//             status: "success",
//             message: "all Courses",
//             response: data
//         });
//     } catch (error) {
//         res.status(404).json({
//             status: "fail",
//             message: "Courses not found",
//             response: error,
//         });
//     }
// });

// * =========================================================== //

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Course.findById({ _id: req.params.id })
        .populate('course_assigned_teacher', 'teacher_cnic');
            



        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Create a student
// * @route   POST /api/student
// * @access  Private/Admin
const createcourse= asyncHandler(async (req, res) => {
    console.log(req.method);
    console.log("what is wrong")
    console.log(req.body);
    let required=[];
    
    if(!req.body.course_name){
        required.push("course_name");
    }
    if(!req.body.course_id)
    {
        required.push("course_id");
    }
    if(!req.body.enrollment_code)
{
    required.push("enrollment_code");
} 
   if(!req.body.course_desc){
        required.push("course_desc");
    }
    if(!req.body.course_year){
        required.push("course_year");
    }
    if(!req.body.course_semester){
        required.push("course_semester");
    }
    if(!req.body.teachercnic){
        required.push("teachercnic");
    }
    if(!req.body.status){
        required.push("status")};
    // if(!req.body.detailed_desc){
    //     required.push("detailed_desc");
   // }
    const {
        course_id,enrollment_code,course_name,course_year,course_semester,course_desc,teachercnic,status
    }=req.body;
    const teacher=await Teacher.findOne({teacher_cnic:teachercnic});
    
    if(!teacher)
    {
        res.status(404).json({
            status: "fail",
            message: "teacher not found",
            response: error
        });
        
    }
    if(required.length!=0)
    {
        let message=required.map((item)=>{
            return " " + item;
        });
        res.json({
            status: "fail",
            message: "Following fields are required - " + message,
            response: [],
        });
    }
    
        try {
            const newCourse = new Course({
                course_id,
                enrollment_code,
                course_name,
                course_year,
                course_semester,
                course_desc,
                course_assigned_teacher:teacher._id,
                status
            });
    
            const savedcourse = await newCourse.save();
            res.status(201).json({
                status: "success",
                message: "course added succesfully",
                response: savedcourse,
                
            });
            console.log(savedcourse)
        } catch (error) {
            console.log("masla yahan hai");
            res.status(404).json({
                status: "fail",
                message: "something went wrong",
                response: error.message
            });
        }
    });




// const createCoursess = asyncHandler(async (req, res) => {

//     // * required array
//     let required = [];


//     if (!req.body.student_first_name)
//         required.push("student_first_name");
//     if (!req.body.student_last_name)
//         required.push("student_last_name");
//     if (!req.body.student_cnic)
//         required.push("student_cnic");
//     if (!req.body.student_email)
//         required.push("student_email");
//     if (!req.body.student_inter_marks)
//         required.push("student_inter_marks");
//     if (!req.body.student_gender)
//         required.push("student_gender");
//     if (!req.body.student_phone_number)
//         required.push("student_phone_number");
//     if (!req.body.student_domicile)
//         required.push("student_domicile");
//     if (!req.body.student_password)
//         required.push("student_password");

//     // * check required fields !
//     if (required.length === 0) {

//         const {
//             student_first_name,
//             student_last_name,
//             student_cnic,
//             student_email,
//             student_inter_marks,
//             student_gender,
//             student_phone_number,
//             student_domicile,
//             student_password,
//         } = req.body;

//         try {
//             const newStudentModel = new StudentModel({
//                 student_first_name,
//                 student_last_name,
//                 student_cnic,
//                 student_email,
//                 student_inter_marks,
//                 student_gender,
//                 student_phone_number,
//                 student_domicile,
//                 student_password,
//             });

//             const data = await newStudentModel.save();
//             res.status(201).json({
//                 status: "success",
//                 message: "student added succesfully",
//                 response: data,
//             });
//         } catch (error) {
//             res.status(404).json({
//                 status: "fail",
//                 message: "something went wrong",
//                 response: error,
//             });
//         }

//     } else {
//         // * mapping the required array list
//         let message = required.map((item) => {
//             return " " + item;
//         });
//         res.json({
//             status: "fail",
//             message: "Following fields are required - " + message,
//             response: [],
//         });
//     }
// });

// * =========================================================== //

// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
// const getassignedcoursetostudent = asyncHandler(async (req, res) => {
//     const { student_id } = req.body; // Change this line
//     console.log(student_id);
    
//     const student = await Student.findById({ _id: mongoose.Types.ObjectId(student_id) });
    
//     if (!student) {
//         res.status(404).json({
//             status: "fail",
//             message: "student not found",
//             response: error
//         });
//     }
// console.log(student_id);
//     try {
//         const courses = await Courseandstudent.find({ student_id: student_id }).populate('course_id');
//         res.status(200).json({
//             status: "success",
//             message: "courses",
//             response: courses,
//         });
//     } catch (error) {
//         res.status(404).json({
//             status: "fail",
//             message: "courses not found",
//             response: error,
//         });
//     }
// });
// const getassignedcoursetostudent = asyncHandler(async (req, res) => {
//     const { student_id } = req.params; // Change to req.params to get the student_id from the URL
//     console.log(student_id);

//     try {
//         const student = await Student.findById({ _id: mongoose.Types.ObjectId(student_id) });

//         if (!student) {
//             return res.status(404).json({
//                 status: "fail",
//                 message: "student not found",
//             });
//         }

//         const courses = await Courseandstudent.find({ student_id: student_id }).populate('course_id');
//         return res.status(200).json({
//             status: "success",
//             message: "courses",
//             response: courses,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: "fail",
//             message: "internal server error",
//             response: error,
//         });
//     }
// });
const getassignedcoursetostudent = asyncHandler(async (req, res) => {
    const { student_id } = req.params;

    try {
        const student = await Student.findById(mongoose.Types.ObjectId(student_id));

        if (!student) {
            return res.status(404).json({
                status: "fail",
                message: "student not found",
            });
        }
console.log(student);
        const courseAndStudentData = await Courseandstudent.find({ student_id: student._id });

        // Extract course IDs from the result
        const courseIds = courseAndStudentData.map(entry => entry.course_id);

        // Fetch courses using the extracted course IDs
        const courses = await Course.find({ _id: { $in: courseIds } });
console.log(courses);
        return res.status(200).json({
            status: "success",
            message: "courses",
            response: courses,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "internal server error",
            response: error.message,
        });
    }
});

const getteachercourses = asyncHandler(async (req, res) => {
    const { teacher_id } = req.params;

    try {
        // Step 1: Find course IDs for the teacher
        const courses = await Course.find({ course_assigned_teacher: teacher_id }, '_id');
        const courseIds = courses.map(course => course._id);

        // Step 2: Find full courses based on the obtained IDs
        const fullCourses = await Course.find({ _id: { $in: courseIds } });

        res.status(200).json({
            status: "success",
            message: "courses",
            response: fullCourses,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "courses not found",
            response: error,
        });
    }
});



const assigncoursetostudent = asyncHandler(async (req, res) => {
    // const student_id = req.body
    // const course_id=req.body;
    const {student_id,course_id}=req.body;
    console.log(student_id);
    console.log(course_id);
    const student=await Student.findById(student_id);
    const course=await Course.findById(course_id);
    if(!student)
    {
        res.status(404).json({
            status: "fail",
            message: "student not found",
            response: error
        });
        
    }
    if(!course)
    {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error
        });
        
    }
    try {
        const courseandstudentrelation = new Courseandstudent({
            student_id,
            course_id
        });
        const savedcourseandstudent = await courseandstudentrelation.save();
            res.status(201).json({
                status: "success",
                message: "course added succesfully",
                response: savedcourseandstudent,
                
            });
            console.log(savedcourseandstudent)
    }
    catch{
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error
        });
    }





});
const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Course.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(201).json({
            status: "success",
            message: "Student updated",
            response: data,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
const pushStudentToCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
   

    try {

        // * Lets Check if Student is Already in array 

        let findStudent = await CourseModel.findOne({ _id: id });

        let isStudent = findStudent.course_assigned_students.includes(student_id);

        if (isStudent) {
            res.status(200).json({
                status: "fail",
                message: "student is already present !",
                response: error,
            });
        } else {
            const data = await CourseModel.findByIdAndUpdate({ _id: id },
                { $push: { course_assigned_students: student_id } },
                {
                    new: true,
                    runValidators: true,
                })

            res.status(201).json({
                status: "success",
                message: "Student updated",
                response: data,
            });
        }

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    Update a student
// * @route   PUT /api/students/:id
// * @access  Private/Admin
const popStudentToCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { student_id } = req.body

    try {

        const data = await CourseModel.findOneAndUpdate({ _id: id },
            { $pull: { course_assigned_students: student_id } },
            {
                new: true,
                runValidators: true,
            })

        res.status(201).json({
            status: "success",
            message: "Student updated",
            response: data,
        });


    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "something went wrong",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    get all student courses
// * @route   GET /api/
// * @access  Public
const getStudentCourses = asyncHandler(async (req, res) => {
    const { student_id } = req.params;



    try {
        const data = await CourseModel.find({
            course_assigned_students: student_id
        }).populate("course_assigned_teacher")



        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    get all teacher courses
// * @route   GET /api/
// * @access  Public
const getTeacherCourses = asyncHandler(async (req, res) => {
    const { teacher_id } = req.params;



    try {
        const data = await CourseModel.find({
            course_assigned_teacher: teacher_id
        }).populate("course_assigned_teacher").populate("course_assigned_students")



        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    get all teacher/course id courses
// * @route   GET /api/
// * @access  Public
const getAllCoursesByTeacherAndCourseID = asyncHandler(async (req, res) => {
    const { teacher_id, course_id } = req.params;



    try {
        const data = await CourseModel.find({
            $and: [
                {
                    course_assigned_teacher: teacher_id
                },
                {
                    _id: course_id
                }
            ]

        }).populate("course_assigned_teacher").populate("course_assigned_students")



        res.status(201).json({
            status: "success",
            message: "course",
            response: data,
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "course not found",
            response: error,
        });
    }
});

// * =========================================================== //

// * @desc    delete a student
// * @route   DELETE /api/student
// * @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        await course.remove();
        res.json({
            status: "success",
            message: "course removed",
            response: null
        });
    } else {
        res.status(404);
        res.json({
            status: "fail",
            message: "something went wrong",
            response: null
        });
    }
});

// * =========================================================== //

export {
    getallcourses,
    getCourse,
    assigncoursetostudent,
    getassignedcoursetostudent,
    deleteCourse,
    createcourse,
    updateCourse,
    pushStudentToCourse,
    popStudentToCourse,
    getStudentCourses,
    getteachercourses,
    getAllCoursesByTeacherAndCourseID
};

// * =========================================================== //
