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
    }
})

let 
User = mongoose.model("User",userModel)
export default User