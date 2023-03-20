import mongoose, { Schema, model } from 'mongoose';
import { UserType } from './user';

type CommentType = {
    author: UserType;
    content: string;
};

const commentSchema = new Schema<CommentType>(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Comment = model<CommentType>('Comment', commentSchema);

export default Comment;
export type { CommentType };
