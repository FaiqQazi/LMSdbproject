import express from "express";
const router = express.Router();

// * =======================================================================================//

import {
    getallcourses,
    assigncoursetostudent,  
    getassignedcoursetostudent,
    getCourse,
    deleteCourse,
    createcourse,
    updateCourse,
    pushStudentToCourse,
    popStudentToCourse,
    getStudentCourses,
    getteachercourses,
    getAllCoursesByTeacherAndCourseID
} from "../../controllers/course/courseController.js";

// *=======================================================================================//

router.route("/courses/createcourse").post(createcourse);

// * =======================================================================================//


router.route("/course/getteachercourses/:teacher_id").get(getteachercourses);

router.route("/courses/getallcourses").get(getallcourses);

// *=======================================================================================//

router.route("/course/:id").get(getCourse);

// *=======================================================================================//


router.route("/course/assigncoursetostudent").post(assigncoursetostudent);


// *=======================================================================================//


router.route("/student_courses/:student_id").get(getStudentCourses);

// *=======================================================================================//

// router.route("/teacher_courses/:teacher_id").get(getTeacherCourses);

// *=======================================================================================//

router.route("/course/update/:id").put(updateCourse)

// *=======================================================================================//
// router.route("/course/getassignedcoursetostudent/:id").get(getassignedcoursetostudent);
router.route("/course/getassignedcoursetostudent/:student_id").get(getassignedcoursetostudent);


router.route("/add_student_to_course/:id").put(pushStudentToCourse)

// *=======================================================================================//

router.route("/remove_student_from_course/:id").put(popStudentToCourse)

// *=======================================================================================//

router.route("/course/:id").delete(deleteCourse);

// *=======================================================================================//

router.route("/course_by_teacher_and_course_id/:teacher_id/:course_id").get(getAllCoursesByTeacherAndCourseID);

// *=======================================================================================//

export default router;