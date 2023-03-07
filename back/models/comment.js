import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId, ref : "User",
        required : true,
    },
    content : {
          type : String, 
          required : true
    }
}, {timestamps : true})

const Comment = mongoose.Schema("Comment", commentSchema)

export default Comment