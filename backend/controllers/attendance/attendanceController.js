import asyncHandler from "express-async-handler";
import Attendance from "../../models/attendance/attendance.js";
import Courseandstudent from "../../models/courseandstudent/courseandstudent.js";

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getAllTeacherAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await AttendanceModel.find({ attendance_teacher: req.params.id })
            .populate("attendance_student")
            .populate("attendance_teacher")
            .sort("-createdAt")

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

// * @desc    Fetch single student
// * @route   GET /api/student
// * @access  Public
const getAllStudentAttendance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id)

    try {
        const data = await AttendanceModel.find({ attendance_student: req.params.id })
            .populate("attendance_student")
            .populate("attendance_teacher")
            .sort("-createdAt")

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
const createAttendance = asyncHandler(async (req, res) => {

    // * required array
    let required = [];

    if (!req.body.attendance_teacher)
        required.push("attendance_teacher");
    if (!req.body.attendance_student)
        required.push("attendance_student");
    if (!req.body.attendance_no_of_classes)
        required.push("attendance_no_of_classes");

    // * check required fields !
    if (required.length === 0) {

        console.log(req.body)

        const {
            attendance_teacher,
            attendance_student,
            attendance_no_of_classes,
        } = req.body;

        try {
            const newAttendanceModel = new AttendanceModel({
                attendance_teacher,
                attendance_student,
                attendance_no_of_classes,
            });

            const data = await newAttendanceModel.save();

            console.log("ATTENDANCE CREATED ! ", data)

            res.status(201).json({
                status: "success",
                message: "Attendance added succesfully",
                response: data,
            });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: "something went wrong",
                response: error,
            });
        }

    } else {
        // * mapping the required array list
        let message = required.map((item) => {
            return " " + item;
        });
        res.json({
            status: "fail",
            message: "Following fields are required - " + message,
            response: [],
        });
    }
});
const createattendence=async(req,res)=>
{
    try {
        // Get all records from Courseandstudent table
        const courseAndStudentRecords = await Courseandstudent.find();
    
        // Create an array to store attendance records
        const attendanceRecords = [];
    
        // Iterate through each record in Courseandstudent table
        courseAndStudentRecords.forEach(async (record) => {
          // Create an attendance record
          const newAttendanceRecord = {
            attendence_course: record.course_id,
            attendance_student: record.student_id,
            date: new Date(), // Set the current date and time
            isPresent: "false", // Default value
          };
    
          // Add the new attendance record to the array
          attendanceRecords.push(newAttendanceRecord);
        });
    
        // Insert all attendance records into the Attendance table
        await Attendance.insertMany(attendanceRecords);
    
        // Send a success response
        res.status(200).json({ success: true, message: 'Attendance records created successfully.' });
      } catch (error) {
        console.error('Error creating attendance records:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
 
}
// const getAttendanceForCourse = async (req, res) => {
//     try {
//       // Get all attendance records for the course
//       console.log( req.params.course_id)
//       const attendanceRecords = await Attendance.find({ attendence_course: req.params.course_id });
//   console.log(attendanceRecords);
//       // Send a success response
//       res.status(200).json({ success: true, attendanceRecords });
//     } catch (error) {
//       console.error('Error getting attendance records:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   };
const getAttendanceForCourse = async (req, res) => {
    try {
        const courseAttendanceRecords = await Attendance.find({ attendence_course: req.params.course_id })
            .populate('attendance_student', 'student_first_name student_last_name student_cnic')
            .populate('attendence_course', 'course_name');

        // Extract relevant information for each record
        const attendanceRecords = courseAttendanceRecords.map(record => ({
            student_first_name: record.attendance_student.student_first_name,
            student_id: record.attendance_student._id,
            student_last_name: record.attendance_student.student_last_name,
            student_cnic: record.attendance_student.student_cnic,
            course_name: record.attendence_course.course_name,
            course_id: record.attendence_course._id,
            date: record.date,
            isPresent: record.isPresent,
        }));

        res.status(200).json({ success: true, attendanceRecords });
    } catch (error) {
        console.error('Error getting attendance records:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

  

//   const markpresent=async(req,res)=>
//   {
//     try {
//         // Get the attendance record
//         const attendanceRecord = await Attendance.findById(req.params.id);
    
//         // Update the attendance record
//         attendanceRecord.isPresent = true;
    
//         // Save the updated attendance record
//         await attendanceRecord.save();
    
//         // Send a success response
//         res.status(200).json({ success: true, message: 'Attendance marked successfully.' });
//       } catch (error) {
//         console.error('Error marking attendance:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//       }
//   }

  const markPresent = async (req, res) => {
    try {
      const { student_id, course_id, isPresent ,date} = req.body;
      console.log(req.body);
  
      // Check if required parameters are provided
      if (!student_id || !course_id || isPresent === undefined) {
        return res.status(400).json({ success: false, message: 'Invalid request. Missing parameters.' });
      }
  
      // Find the attendance record based on student_id and course_id
      const attendanceRecord = await Attendance.findOne({
        attendance_student: student_id,
        attendence_course: course_id,
        date: date,
      });
  
      // Check if the attendance record exists
      if (!attendanceRecord) {
        return res.status(404).json({ success: false, message: 'Attendance record not found.' });
      }
  
      // Update the isPresent attribute
      attendanceRecord.isPresent = isPresent;
  
      // Save the updated attendance record
      await attendanceRecord.save();
  
      // Send a success response
      res.status(200).json({ success: true, message: 'Attendance marked successfully.' });
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

// * =========================================================== //

export {
    getAllTeacherAttendance,
    getAllStudentAttendance,
    createAttendance,


    getAttendanceForCourse,
    markPresent,
    createattendence
};

// * =========================================================== //
