import mongoose, { Schema, model } from 'mongoose';
import { CompanyType } from './company';
import { SharingRequestType } from './sharingRequest';
import Supply, { SupplyType } from './supply';

type UserType = {
    id: string;
    email: string;
    password: string;
    firstname: string;
    surname: string;
    roles: string[];
    company: CompanyType;
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
            min: 5
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        roles: [
            {
                type: String,
                required: true,
                enum: ['user', 'admin', 'superadmin'],
                default: 'user'
            }
        ],
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        borrowedSupplies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supply',
                default: []
                // unique: true
            }
        ],
        sentSharingRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SharingRequest',
                default: []
            }
        ],
        receivedSharingRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SharingRequest',
                default: []
            }
        ]
    },
    { timestamps: true }
);

userSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function (next) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        await Supply.deleteMany({ owner: user._id });
    }
);

const User = model<UserType>('User', userSchema);
export type { UserType };
export default User;
