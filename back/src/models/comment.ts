import mongoose, { Schema } from "mongoose";

const commentSchema: Schema = new Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId, ref : "User",
        required : true,
    },
    content : {
          type : String, 
          required : true
    }
}, {timestamps : true})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment
