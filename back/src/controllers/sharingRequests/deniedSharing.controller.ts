import Express from 'express';
import { sharingRequestRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { deniedSharingRequest } from '../../usecases/sharingRequest/deniedSharingRequest.usecase';

const deniedSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            await deniedSharingRequest(
                req.body.sharingRequestId,
                sharingRequestRepositoryMongo.getSharingRequest,
                userRepositoryMongo.getUserById,
                supplyRepositoryMongo.getSupply,
                sharingRequestRepositoryMongo.deniedSharingRequest
            );
            res.status(200).json({
                message: 'The sharing request has been denied'
            });
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
export default deniedSharing;
