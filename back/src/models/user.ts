import mongoose, { Schema, model } from 'mongoose';
import { CompanyType } from './company';
import { SharingRequestType } from './sharingRequest';
import { SupplyType } from './supply';

type UserType = {
    email: string;
    password: string;
    firstname: string;
    surname: string;
    roles: string[];
    company: CompanyType;
    supplies: SupplyType[];
    borrowedSupplies: SupplyType[];
    sentSharingRequests: SharingRequestType[];
    receivedSharingRequests: SharingRequestType[];
};

const userSchema = new Schema<UserType>(
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
        sentSharingRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SharingRequest',
            },
        ],
        receivedSharingRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SharingRequest',
            },
        ],
    },
    { timestamps: true },
);

const User = model<UserType>('User', userSchema);
export type { UserType };
export default User;
