import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name : {
        type : String, 
        required : true,
        unique : true,
    },
    joinCode : {
        type : String, 
        required : true,
    },
    employees : [
        {
            type : mongoose.Schema.Types.ObjectId, ref : "User"
        }
    ],
    suppliesManager :  {
            type : mongoose.Schema.Types.ObjectId, ref : "User"  
        }

}, {timestamps : true})

const Company = mongoose.model("Company", companySchema)

export default Company