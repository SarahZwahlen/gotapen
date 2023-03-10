import Express from 'express';
import SharingRequest from '../../models/sharingRequest';
import User from '../../models/user';

const deniedSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        const sharingRequest = await SharingRequest.findOne({
            _id: req.body.sharingRequestId,
        });

        console.log(sharingRequest);
        if (sharingRequest) {
            await User.updateOne(
                { _id: sharingRequest.applicant },
                {
                    $pull: { sentSharingRequests: sharingRequest._id },
                },
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
                message: 'The other user denied the sharing request',
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
export default deniedSharing;
