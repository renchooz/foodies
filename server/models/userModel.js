import mongoose from "mongoose";

let userModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    cartItems:{
        type: Object,
        default:{}
    }
},{minimize:false})

let 
User = mongoose.models.user || mongoose.model("user",userModel)
export default User