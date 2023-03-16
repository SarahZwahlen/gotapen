import { UserType } from '../../models/user';
import { Response, Request } from 'express';
import { logUser } from './logUser.usecase';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';

const loginController = async (req: Request, res: Response) => {
    try {
        const user: UserType = await logUser(
            req.body.email,
            req.body.password,
            userRepositoryMongo.getUserByEmail
        );
        req.session.user = user;
        // req.session.user._id = user._id;
        console.log('login', req.session.user);
        console.log('login', req.session.user.id);
        res.json({
            message: 'Authentification succeed'
        });
    } catch (error) {
        res.status(401).json({
            message:
                'Authentification failed, maybe some fields are wrong or missing'
        });
    }
};

export default loginController;
