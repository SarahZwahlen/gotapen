import Express from 'express';
import { sharingRequestRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { acceptSharingRequest } from '../../usecases/sharingRequest/acceptSharingRequest.usecase';

const acceptSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            await acceptSharingRequest(
                req.body.sharingRequestId,
                sharingRequestRepositoryMongo.getSharingRequest,
                userRepositoryMongo.getUserById,
                supplyRepositoryMongo.getSupply,
                sharingRequestRepositoryMongo.acceptSharingRequest
            );

            res.json({
                message: 'The sharing request has been accepted'
            });
        } else {
            res.json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};
export default acceptSharing;
