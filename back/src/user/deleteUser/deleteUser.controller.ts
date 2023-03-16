import { Request, Response } from 'express';
import User from '../../models/user';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';
import { deleteAccount } from './deleteUser.usecase';

const deleteUser = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const loggedUser = await User.findById(req.body.userId);

            if (
                loggedUser!.id === req.body.userId ||
                req.session.user.roles.includes('admin')
            ) {
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
                    message:
                        'You must be the account owner or be an admin to delete it'
                });
            }
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
