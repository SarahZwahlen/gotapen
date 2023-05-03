import Express from 'express';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { createUser } from '../../usecases/user/createUser.usecase';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        if (!req.body.email) {
            res.status(401).json({
                message: 'An email is missing'
            });
        }
        if (!req.body.password) {
            res.status(401).json({
                message: 'A password is missing'
            });
        }
        if (!req.body.firstname) {
            res.status(401).json({
                message: 'A firstname is missing'
            });
        }
        if (!req.body.surname) {
            res.status(401).json({
                message: 'A surname is missing'
            });
        }
        if (!req.body.companyCode) {
            res.status(401).json({
                message: 'The company code is missing'
            });
        }
        if (!req.body.companyName) {
            res.status(401).json({
                message: 'The company name is missing'
            });
        }
        const user = await createUser(
            req.body,
            userRepositoryMongo,
            companyRepositoryMongo
        );
        req.session.user = user;
        res.json({
            message: 'account created',
            isLogged: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                'An error occused, maybe something is missing, or this email is already used by an other user. Please retry',
            isLogged: false
        });
    }
};

export default createAccount;
