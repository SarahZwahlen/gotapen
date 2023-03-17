import { Request, Response } from 'express';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';
import { getUserDatas } from './getUserDatas.usecase';

const showUserDatas = async (req: Request, res: Response) => {
    console.log('coucou');
    try {
        if (req.session.user) {
            const userDatas = await getUserDatas(
                req.session.user.id,
                userRepositoryMongo.getUserById
            );
            if (userDatas) {
                res.json({
                    message: 'Here are the user datas',
                    user: userDatas
                });
            } else {
                res.json({
                    message: "This user doesn't exists"
                });
            }
        } else {
            res.json({
                message: 'You must be logged'
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

export default showUserDatas;
