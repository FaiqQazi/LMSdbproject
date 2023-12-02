import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getAllTeacherAttendance,
    getAllStudentAttendance,
    createAttendance,


    
    getAttendanceForCourse,
    markPresent,
    createattendence
} from "../../controllers/attendance/attendanceController.js";

// *=======================================================================================//

// router.route("/attendance").post(createAttendance);

// * ======================================================================================//

router.route("/teachers_attendance/:id").get(getAllTeacherAttendance);

// *=======================================================================================//

router.route("/students_attendance/:id").get(getAllStudentAttendance);



router.route("/attendence/getattendenceforcourse/:course_id").get( getAttendanceForCourse);

router.route("/attendence/markpresent").post(markPresent);

router.route("/attendence/createattendence").post(createattendence);

// *=======================================================================================//

export default router;