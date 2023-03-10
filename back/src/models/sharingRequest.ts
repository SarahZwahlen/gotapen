import mongoose, { Schema, model } from 'mongoose';
import { SupplyType } from './supply';
import { UserType } from './user';

type SharingRequestType = {
    applicant: UserType;
    sharer: UserType;
    sharedSupply: SupplyType;
};

const sharingRequestSchema = new Schema<SharingRequestType>({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sharer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sharedSupply: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'Supply',
    },
    // {timestamps : true}
});

const SharingRequest = model<SharingRequestType>(
    'SharingRequest',
    sharingRequestSchema,
);

export default SharingRequest;
export type { SharingRequestType };
