import { Request, Response } from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { getUserSupplies } from '../../usecases/supply/getUserSupplies.usecase';

const showUserSupplies = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const userSupplies = await getUserSupplies(
                req.session.user.id,
                userRepositoryMongo.getUserById,
                supplyRepositoryMongo.getSupplies
            );

            if (userSupplies) {
                res.status(200).json({
                    message: 'Here are the supplies',
                    supplies: userSupplies
                });
            } else {
                res.status(200).json({
                    message: "This user doesn't have any supply"
                });
            }
        } else {
            res.status(401).json({
                message: 'User is not logged'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'An error occured',
            error: error
        });
    }
};

export default showUserSupplies;
