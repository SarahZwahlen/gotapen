import Express from 'express';
import User from '../../models/user';
import { sharingRequestRepository } from '../../repositories/sharingRequest.repository';

const showSentSharingRequests = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        const userSharingRequests: object[] = [];
        const user = await User.findById(req.body.userId);

        if (user) {
            const requestResult =
                sharingRequestRepository.showSentSharingRequests(
                    userSharingRequests,
                    user
                );
            res.json({
                message: 'Here are your received sharing requests',
                requests: requestResult
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default showSentSharingRequests;
