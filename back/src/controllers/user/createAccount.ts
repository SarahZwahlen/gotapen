import Express from 'express';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';
import { createUser } from '../../useCases/createUser.usecase';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        if (!req.body.email) {
            throw new Error('An email is missing');
        }
        if (!req.body.password) {
            throw new Error('A password is missing');
        }
        if (!req.body.firstname) {
            throw new Error('A firstname is missing');
        }
        if (!req.body.surname) {
            throw new Error('A surname is missing');
        }
        const user = await createUser(
            req.body,
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
                'An error occused, maybe something is missing, or this email is already used by an other user. Please retry'
        });
    }
};

export default createAccount;
