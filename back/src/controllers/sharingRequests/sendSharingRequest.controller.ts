import Express from 'express';
import { sharingRequestRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { sendSharingRequestUseCase } from '../../usecases/sharingRequest/sendSharingRequest.usecase';

const sendSharingRequest = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            await sendSharingRequestUseCase(
                req.body.sharerId,
                req.session.user.id,
                req.body.sharedSupplyId,
                userRepositoryMongo,
                supplyRepositoryMongo,
                sharingRequestRepositoryMongo.sendSharingRequest
            );
            res.json({
                message: 'Sharing request success'
            });
        } else {
            res.json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: 'Sharing request failed' });
    }
};

export default sendSharingRequest;
