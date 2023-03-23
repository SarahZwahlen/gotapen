import mongoose, { Schema, model } from 'mongoose';
import { CompanyType } from './company';
import SharingRequest from './sharingRequest';
import { UserType } from './user';

type SupplyType = {
    id: string;
    name: string;
    availability: boolean;
    imagePath: string;
    owner: UserType;
    company: CompanyType;
};

const supplySchema = new Schema<SupplyType>(
    {
        name: {
            type: String,
            required: true
        },
        availability: {
            type: Boolean
        },
        imagePath: {
            type: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    },
    { timestamps: true }
);

supplySchema.pre(
    'deleteOne',
    { document: true, query: false },
    async function (next) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const supply = this;
        const associatedSharingRequests = await SharingRequest.find({
            sharedSupply: supply.id
        });

        associatedSharingRequests.forEach(async (request) => {
            await SharingRequest.deleteOne(request._id);
        });

        next();
    }
);

const Supply = model<SupplyType>('Supply', supplySchema);

export type { SupplyType };
export default Supply;
