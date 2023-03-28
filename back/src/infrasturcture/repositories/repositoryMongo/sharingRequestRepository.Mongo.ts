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
        const sharingRequest = await SharingRequest.find({
            sharer: userId
        }).populate(['sharedSupply', 'applicant']);

        if (sharingRequest) {
            let finalDatas: any = [];
            sharingRequest.forEach((request) => {
                finalDatas = [
                    ...finalDatas,
                    {
                        id: request.id,
                        supplyName: request.sharedSupply.name,
                        supplyImage: request.sharedSupply.imagePath,
                        applicantName: `${request.applicant.firstname} ${request.applicant.surname}`
                    }
                ];
            });

            return finalDatas;
        } else {
            return null;
        }
    },
    showSentSharingRequests: async (userId: string) => {
        const sharingRequest = await SharingRequest.find({
            applicant: userId
        }).populate(['sharedSupply', 'sharer']);

        if (sharingRequest) {
            let finalDatas: any = [];
            sharingRequest.forEach((request) => {
                finalDatas = [
                    ...finalDatas,
                    {
                        id: request.id,
                        supplyName: request.sharedSupply.name,
                        supplyImage: request.sharedSupply.imagePath,
                        sharerName: `${request.sharer.firstname} ${request.sharer.surname}`
                    }
                ];
            });

            return finalDatas;
        } else {
            return null;
        }
    },
    getSharingRequest: async (sharingRequestId: string) => {
        const sharingRequest = await SharingRequest.findById(
            sharingRequestId
        ).populate(['sharer', 'applicant', 'sharedSupply']);
        return sharingRequest;
    }
};

export { sharingRequestRepositoryMongo };
