import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'completed', 'failed'],
        default:'pending'
    },
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String
    }


},{timestamps:true});
export const PaymentDetail = mongoose.model('PaymentDetail', PaymentSchema);