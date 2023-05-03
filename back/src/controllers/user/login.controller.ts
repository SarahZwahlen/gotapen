import { Response, Request } from 'express';
import { UserType } from '../../infrasturcture/models/user';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { logUser } from '../../usecases/user/logUser.usecase';

const loginController = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const user: UserType = await logUser(
            req.body.email,
            req.body.password,
            userRepositoryMongo.getUserByEmail
        );
        req.session.user = user;
        res.status(200).json({
            user: {
                surname: req.session.user.surname,
                firstname: req.session.user.firstname,
                email: req.session.user.email,
                role: req.session.user.roles
            }
        });
    } catch (error) {
        res.status(401).json({
            message:
                'Authentification failed, maybe some fields are wrong or missing',
            error: error,
            isLogged: false
        });
    }
};

export default loginController;
