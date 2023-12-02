import mongoose from 'mongoose';
const Schema=mongoose.Schema;
const feesSchema=new mongoose.Schema({
    fees_student:{
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: null
    },
    fees_amount:{
        type:Number,
        required:true
    },
    is_submitted:{
        type:String,
    
    },
    semester:{
        type:String,
        required:true
    }
})
const Fees=mongoose.model('Fees',feesSchema);
export default Fees;

