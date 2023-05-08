import Express from 'express';
import { sharingRequestRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { showReceivedSharingReq } from '../../usecases/sharingRequest/showRecivedSharingRequest.usecase';

const showReceivedSharingRequest = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            const requests = await showReceivedSharingReq(
                req.session.user.id,
                userRepositoryMongo.getUserById,
                sharingRequestRepositoryMongo.showReceivedSharingRequest
            );
            if (requests) {
                res.status(200).json({
                    message: 'Here are the sent sharing requests',
                    requests
                });
            } else {
                res.status(200).json({
                    message: 'No sent sharing requests'
                });
            }
        } else {
            res.status(401).json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default showReceivedSharingRequest;
