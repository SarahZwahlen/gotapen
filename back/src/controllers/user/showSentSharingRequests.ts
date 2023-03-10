import Express from 'express';
import SharingRequest, {
    SharingRequestType,
} from '../../models/sharingRequest';
import Supply from '../../models/supply';
import User from '../../models/user';

const showSentSharingRequests = async (
    req: Express.Request,
    res: Express.Response,
) => {
    try {
        const userSharingRequests: object[] = [];
        const user = await User.findById(req.body.userId);

        if (user) {
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
                    },
                ),
            );
            res.json({
                message: 'Here are your received sharing requests',
                requests: userSharingRequests,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
        });
    }
};

export default showSentSharingRequests;
