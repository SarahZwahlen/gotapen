import Express from 'express';
import Supply from '../../infrasturcture/models/supply';
import User from '../../infrasturcture/models/user';
import { sharingRequestRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';

const sendSharingRequest = async (
    req: Express.Request,
    res: Express.Response
) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        const applicant = await User.findOne({ _id: req.body.applicantId });
        const sharer = await User.findOne({ _id: req.body.sharerId });
        const sharedSupply = await Supply.findOne({
            _id: req.body.sharedSupplyId
        });

        if (sharer && applicant && sharedSupply) {
            sharingRequestRepositoryMongo.sendSharingRequest(
                req.body.sharerId,
                req.body.applicantId,
                req.body.sharedSupplyId
            );
        } else {
            res.json({
                message: 'Something is null'
            });
        }
        res.json({
            message: 'Sharing request success'
        });
    } catch (error) {
        console.log(error);
        res.json({ message: 'Sharing request failed' });
    }
};

export default sendSharingRequest;
