import Express from 'express';
import User from '../../models/user';
import { sharingRequestRepository } from '../../repositories/sharingRequest.repository';

const showReceivedSharingRequest = async (
    req: Express.Request,
    res: Express.Response
) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        const userSharingRequests: object[] = [];

        const user = await User.findById(req.body.userId);

        if (user) {
            const requestResult =
                sharingRequestRepository.showReceivedSharingRequest(
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

export default showReceivedSharingRequest;
