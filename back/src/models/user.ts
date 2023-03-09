import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            min: 5,
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: String,
                required: true,
                enum: ['user', 'admin', 'superadmin'],
                default: 'user',
            },
        ],
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        supplies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supply',
            },
        ],
        borrowedSupplies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supply',
                unique: true,
            },
        ],
        sharingRequests: [
            {
                applicant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                askedSupply: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Supply',
                },
            },
        ],
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
