import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const contentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content_course:{
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: null
    },
    pdf:{
        type:String,
        required:true
    
    }
})
const Content=mongoose.model('Content',contentSchema);
export default Content;