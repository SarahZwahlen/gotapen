import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String, 
        lowercase : true,
        unique : true, 
        required : true,
        min : 5,
    },
    password :{
        type : String, 
        required : true,
    },
    firstname : {
        type : String,
        required : true,
    },
    surname : {
        type : String, 
        required : true,
    },
    roles : [{
        type : String, 
        required : true, 
        enum : ['user', 'admin', 'superadmin']
    }],
    company : {
        type : mongoose.Schema.Types.ObjectId, ref :"Company",
    },
    supplies : [
        {
            type : mongoose.Schema.Types.ObjectId, ref :"Supply",
        }
    ]
}, {timestamps : true})

const User = mongoose.model("User", userSchema)
export default User