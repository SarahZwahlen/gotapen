import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { deleteAccount } from '../../usecases/user/deleteUser.usecase';
import Express from 'express';

const deleteUser = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            console.log('back body', req.body);
            await deleteAccount(req.body.employeeId, userRepositoryMongo);
            res.status(202).json({
                message: 'The user is deleted'
            });
        } else {
            res.status(401).json({
                message: 'User is not logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured',
            error: error
        });
    }
};

export default deleteUser;
