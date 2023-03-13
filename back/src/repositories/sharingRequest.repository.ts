import mongoose from 'mongoose';
import SharingRequest, { SharingRequestType } from '../models/sharingRequest';
import Supply from '../models/supply';
import User, { UserType } from '../models/user';

const sharingRequestRepository = {
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
        sharerId: string | mongoose.Types.ObjectId,
        applicantId: string | mongoose.Types.ObjectId,
        sharedSupplyId: string | mongoose.Types.ObjectId
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

            return newSharingRequest;
        }
    },
    showReceivedSharingRequest: async (
        userSharingRequests: object[],
        user: UserType
    ) => {
        await Promise.all(
            user.receivedSharingRequests.map(
                async (request: SharingRequestType) => {
                    const receivedRequest = await SharingRequest.findOne({
                        _id: request
                    });
                    console.log(receivedRequest);
                    const applicant = await User.findOne({
                        _id: receivedRequest?.applicant
                    });
                    const sharer = await User.findOne({
                        _id: receivedRequest?.sharer
                    });
                    const supply = await Supply.findOne({
                        _id: receivedRequest?.sharedSupply
                    });

                    userSharingRequests.push({
                        applicant: applicant?.firstname,
                        sharer: sharer?.firstname,
                        supply: supply?.name
                    });

                    return userSharingRequests;
                }
            )
        );
    };
    showSentSharingRequests : async (userSharingRequests: object[], user: UserType) => {
        await Promise.all(
            user.sentSharingRequests.map(
                async (request: SharingRequestType) => {
                    const sentRequest = await SharingRequest.findOne({
                        _id: request,
                    });
                    console.log(sentRequest);
                    const applicant = await User.findOne({
                        _id: sentRequest?.applicant,
                    });
                    const sharer = await User.findOne({
                        _id: sentRequest?.sharer,
                    });
                    const supply = await Supply.findOne({
                        _id: sentRequest?.sharedSupply,
                    });

                    userSharingRequests.push({
                        applicant: applicant?.firstname,
                        sharer: sharer?.firstname,
                        supply: supply?.name,
                    });
                    
                    return userSharingRequests
                },
            ),
        );
    }
};

export { sharingRequestRepository };
