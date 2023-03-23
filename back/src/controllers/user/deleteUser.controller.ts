import { Request, Response } from 'express';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { deleteAccount } from '../../usecases/user/deleteUser.usecase';

const deleteUser = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            await deleteAccount(
                req.body.userId,
                userRepositoryMongo.getUserById,
                userRepositoryMongo.deleteUser
            );
            res.json({
                message: 'The user is deleted'
            });
        } else {
            res.json({
                message: 'User is not logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
            error: error
        });
    }
};

export default deleteUser;
