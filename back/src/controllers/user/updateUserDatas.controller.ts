import { RequestHandler } from 'express';
import { UserType } from '../../infrasturcture/models/user';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { modifyUser } from '../../usecases/user/modifyUser.usecase';

const updateUserDatas: RequestHandler = async (req, res) => {
    try {
        if (!req.session.user) {
            res.status(401).json({
                message: 'You must be logged'
            });
        } else {
            const datas: Partial<UserType> = {
                id: req.session.user.id,
                ...req.body
            };
            const user = await modifyUser(
                req.session.user.id,
                datas,
                userRepositoryMongo
            );
            if (user) {
                req.session.user = user;
                res.status(200).json({
                    message: 'Use has been modified',
                    user: user
                });
            } else {
                res.status(400).json({
                    message: 'An error occured'
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default updateUserDatas;
