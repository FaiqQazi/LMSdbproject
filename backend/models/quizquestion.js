import mongoose from "mongoose";
const Schema = mongoose.Schema;
const quizquestionSchema = new mongoose.Schema(
    {
        // * ok
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
            default: null
        },
        course:{
            type: Schema.Types.ObjectId,
            ref: "Course",
            default: null
        },
        question:{
            type:String ,
            required:true
        },
        option1:{
            type:String,
            required:true
        },
        option2:{
            type:String,
            required:true
        },  
        option3:{
            type:String,
            required:true
        },
        option4:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        iscorrect:{
            type:String,
            required:true
        },
        quiznumber:{
            type:String,
            required:true
        }
    }
);