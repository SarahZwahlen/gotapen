import SharingRequest, {
    SharingRequestType
} from '../../models/sharingRequest';
import Supply from '../../models/supply';
import User from '../../models/user';

const sharingRequestRepositoryMongo = {
    acceptSharingRequest: async (sharingRequest: SharingRequestType) => {
        await User.updateOne(
            { _id: sharingRequest.applicant },
            {
                $push: { borrowedSupplies: sharingRequest.sharedSupply }
            }
        );
        await Supply.updateOne(
            { _id: sharingRequest.sharedSupply },
            { availability: false }
        );
        const request = await SharingRequest.findById(sharingRequest.id);
        await request?.deleteOne();
    },
    deniedSharingRequest: async (sharingRequest: SharingRequestType) => {
        const request = await SharingRequest.findById(sharingRequest.id);
        await request?.deleteOne();
    },
    sendSharingRequest: async (
        sharerId: string,
        applicantId: string,
        sharedSupplyId: string
    ) => {
        const applicant = await User.findById(applicantId);
        const sharer = await User.findById(sharerId);
        const sharedSupply = await Supply.findById(sharedSupplyId);

        const newSharingRequest = new SharingRequest({
            applicant: applicant,
            sharer: sharer,
            sharedSupply: sharedSupply
        });

        newSharingRequest.save();

        if (sharer && applicant && sharedSupply) {
            await User.updateOne(
                { _id: sharer._id },
                {
                    $push: {
                        receivedSharingRequests: newSharingRequest
                    }
                }
            );

            await User.updateOne(
                { _id: applicant._id },
                {
                    $push: {
                        sentSharingRequests: newSharingRequest
                    }
                }
            );
        }
    },
    showReceivedSharingRequest: async (userId: string) => {
        const user = await User.findById(userId);
        if (user?.receivedSharingRequests) {
            return user?.receivedSharingRequests;
        } else {
            return null;
        }
    },
    showSentSharingRequests: async (userId: string) => {
        const user = await User.findById(userId);
        if (user?.sentSharingRequests) {
            return user.sentSharingRequests;
        } else {
            return null;
        }
    },
    getSharingRequest: async (sharingRequestId: string) => {
        const sharingRequest = await SharingRequest.findById(sharingRequestId);
        return sharingRequest;
    }
};

export { sharingRequestRepositoryMongo };
