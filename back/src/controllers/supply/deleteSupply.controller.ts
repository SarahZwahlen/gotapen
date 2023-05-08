import Express from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import { deleteSupplyUsecase } from '../../usecases/supply/deleteSupply.usecase';

const deleteSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.body.supplyId) {
            if (req.session.user) {
                await deleteSupplyUsecase(
                    req.body.supplyId,
                    supplyRepositoryMongo.deleteSupplyAndAllItsRef
                );
                res.status(200).json({ message: 'Supply deleted' });
            } else {
                res.status(401).json({
                    message: 'User is not authentified'
                });
            }
        } else {
            res.status(400).json({
                message: 'supplyId is missing'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default deleteSupply;
