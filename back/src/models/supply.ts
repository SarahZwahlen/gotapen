import mongoose, { Schema, model } from 'mongoose';
import { CommentType } from './comment';
import { UserType } from './user';

type SupplyType = {
    name: string;
    availability: boolean;
    imagePath: string;
    owner: UserType;
    comments: CommentType;
};

const supplySchema = new Schema<SupplyType>(
    {
        name: {
            type: String,
            required: true,
        },
        availability: {
            type: Boolean,
        },
        imagePath: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true },
);

const Supply = model<SupplyType>('Supply', supplySchema);

export type { SupplyType };
export default Supply;
