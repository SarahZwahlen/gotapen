import Express from 'express';
import SharingRequest, {
    SharingRequestType,
} from '../../models/sharingRequest';
import Supply from '../../models/supply';
import User from '../../models/user';

const showReceivedSharingRequest = async (
    req: Express.Request,
    res: Express.Response,
) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        const userSharingRequests: object[] = [];

        const user = await User.findById(req.body.userId);

        if (user) {
            await Promise.all(
                user.receivedSharingRequests.map(
                    async (request: SharingRequestType) => {
                        const receivedRequest = await SharingRequest.findOne({
                            _id: request,
                        });
                        console.log(receivedRequest);
                        const applicant = await User.findOne({
                            _id: receivedRequest?.applicant,
                        });
                        const sharer = await User.findOne({
                            _id: receivedRequest?.sharer,
                        });
                        const supply = await Supply.findOne({
                            _id: receivedRequest?.sharedSupply,
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

export default showReceivedSharingRequest;
