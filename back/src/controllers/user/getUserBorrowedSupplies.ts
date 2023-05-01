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
            console.log(supplies);
            res.json({
                supplies
            });
        } else {
            res.json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
            error
        });
    }
};

export default getUserBorrowedSupplies;
