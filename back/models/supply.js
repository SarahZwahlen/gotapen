import mongoose from "mongoose";

const supplySchema = mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    availability : {
        type : Boolean,
    },
    imagePath : {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId, ref:"User",
        required : true,
        // refPath :"Owner",
    },
    // Owner :{
    //     type : String,
    //     required : true,  
    //     enum : ["User", "Company"]
    // },
    comments : [
        {type : mongoose.Schema.Types.ObjectId, ref : "Comment"}
    ]
}, {timestamps : true})

const Supply = mongoose.model("Supply", supplySchema)

export default Supply