import Express from 'express';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';
import { createUser } from '../../useCases/createUser.usecase';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        const user = await createUser(
            req.body.email,
            req.body.password,
            req.body.firstname,
            req.body.surname,
            userRepositoryMongo.saveUser,
            userRepositoryMongo.getUserByEmail
        );
        req.session.user = user;
        res.json({
            message: 'account created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                'An error occured, please retry. Maybe some required datas are missing or this email is already used.'
        });
    }
};

export default createAccount;
