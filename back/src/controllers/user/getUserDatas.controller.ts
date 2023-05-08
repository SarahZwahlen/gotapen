import { Request, Response } from 'express';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { getUserDatas } from '../../usecases/user/getUserDatas.usecase';

const showUserDatas = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            const userDatas = await getUserDatas(
                req.session.user.id,
                userRepositoryMongo.getUserById
            );
            if (userDatas) {
                res.status(200).json({
                    message: 'Here are the user datas',
                    datas: {
                        firstname: userDatas.firstname,
                        surname: userDatas.surname,
                        email: userDatas.email,
                        role: userDatas.roles,
                        companyName: userDatas.company.name,
                        id: userDatas.id
                    },
                    isLogged: true
                });
            } else {
                res.status(400).json({
                    message: "This user doesn't exists",
                    isLogged: false
                });
            }
        } else {
            res.status(401).json({
                message: 'You must be logged',
                isLogged: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured',
            isLogged: false,
            error: error
        });
    }
};

export default showUserDatas;
