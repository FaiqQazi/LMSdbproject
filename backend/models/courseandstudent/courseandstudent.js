import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const courseandstudent=new mongoose.Schema({
    course_id :{
        type: Schema.Types.ObjectId,
        ref: "Course",
        // default: null
    },
    student_id:{
        type: Schema.Types.ObjectId,
                ref: "Student",
                // default: null
    }
})
const Courseandstudent=mongoose.model('Courseandstudent',courseandstudent);
export default Courseandstudent;