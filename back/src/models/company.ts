import mongoose, { Schema, model } from 'mongoose';
import { UserType } from './user';

type CompanyType = {
    id: string;
    name: string;
    joinCode: string;
    employees: UserType[];
};

const companySchema = new Schema<CompanyType>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        joinCode: {
            type: String,
            required: true
        },
        employees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
);

const Company = model<CompanyType>('Company', companySchema);

export default Company;
export type { CompanyType };
