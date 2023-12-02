import mongoose from "mongoose";
const Schema = mongoose.Schema;
const quizSchema=new mongoose.Schema({
    
    course:{
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: null
    },
    quiznumber:{
        type:String,
        required:true
    },
    quizmarks:{
        type:String,
        required:true
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: null
    }
    // quiz_start_time:{
    //     type:String,
    //     required:true
    // },
    // quiz_end_time:{
    //     type:String,
    //     required:true
    // },
    // quiz_duration:{
    //     type:String,
    //     required:true
    // },
    // quiz_date:{
    //     type:String,
    //     required:true
    // }


})
const Quiz=mongoose.model('Quiz',quizSchema);
export default Quiz;