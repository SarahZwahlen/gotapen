import { Response, Request } from 'express';
import { UserType } from '../../infrasturcture/models/user';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { logUser } from '../../usecases/user/logUser.usecase';

const loginController = async (req: Request, res: Response) => {
    try {
        const user: UserType = await logUser(
            req.body.email,
            req.body.password,
            userRepositoryMongo.getUserByEmail
        );
        req.session.user = user;
        res.json({
            message: 'Authentification succeed',
            isLogged: true
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
