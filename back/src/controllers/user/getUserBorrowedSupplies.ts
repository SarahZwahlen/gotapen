import { Request, Response } from 'express';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import showBorrowedSupplies from '../../usecases/supply/showBorrowedSupplies.usecase';

const getUserBorrowedSupplies = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const supplies = await showBorrowedSupplies(
                req.session.user.id,
                userRepositoryMongo
            );
            res.status(200).json({
                supplies
            });
        } else {
            res.status(401).json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured',
            error
        });
    }
};

export default getUserBorrowedSupplies;
