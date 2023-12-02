import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendanceSchema = new mongoose.Schema(
    {
        attendence_course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            default: null
        },
        attendance_student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            default: null
        },
        date: {
            type: Date,
            default: Date.now
        },
        isPresent: {
            type:String,
            
        }
    },
    { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
