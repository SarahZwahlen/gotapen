import Express from 'express';
import SharingRequest from '../../models/sharingRequest';
import Supply from '../../models/supply';
import User from '../../models/user';

const acceptSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        const sharingRequest = await SharingRequest.findOne({
            _id: req.body.sharingRequestId,
        });

        console.log(sharingRequest);
        if (sharingRequest) {
            await User.updateOne(
                { _id: sharingRequest.applicant },
                {
                    $push: { borrowedSupplies: sharingRequest.sharedSupply },
                },
            );
            await User.updateOne(
                { _id: sharingRequest.applicant },
                {
                    $pull: { sentSharingRequests: sharingRequest._id },
                },
            );
            await Supply.updateOne(
                { _id: sharingRequest.sharedSupply },
                { availability: false },
            );
            await User.updateOne(
                {
                    _id: sharingRequest.sharer,
                },
                {
                    $pull: {
                        receivedSharingRequests: sharingRequest._id,
                    },
                },
            );
            await SharingRequest.deleteOne({ _id: sharingRequest._id });

            res.json({
                message: 'done',
                request: sharingRequest,
            });
        } else {
            res.json({
                message: "This request doesn't exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
        });
    }
};
export default acceptSharing;
