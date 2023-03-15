import mongoose, { Schema, model } from 'mongoose';
import { SupplyType } from './supply';
import User, { UserType } from './user';

type SharingRequestType = {
    id: string;
    applicant: UserType;
    sharer: UserType;
    sharedSupply: SupplyType;
};

const sharingRequestSchema = new Schema<SharingRequestType>({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharedSupply: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'Supply'
    }
});

sharingRequestSchema.post('save', async function (sharingRequest, next) {
    await User.updateOne(
        { _id: sharingRequest.applicant },
        {
            $push: { sentSharingRequests: sharingRequest.id }
        }
    );
    await User.updateOne(
        {
            _id: sharingRequest.sharer
        },
        {
            $push: {
                receivedSharingRequests: sharingRequest.id
            }
        }
    );
    next();
});

sharingRequestSchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function (next) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const sharingRequest = this;
        await User.updateOne(
            { _id: sharingRequest.applicant },
            {
                $pull: { sentSharingRequests: sharingRequest.id }
            }
        );
        await User.updateOne(
            {
                _id: sharingRequest.sharer
            },
            {
                $pull: {
                    receivedSharingRequests: sharingRequest.id
                }
            }
        );
        next();
    }
);

const SharingRequest = model<SharingRequestType>(
    'SharingRequest',
    sharingRequestSchema
);

export default SharingRequest;
export type { SharingRequestType };
