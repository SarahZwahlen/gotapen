import Express from 'express';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { createUser } from '../../usecases/user/createUser.usecase';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.body.email) {
            if (req.body.password) {
                if (req.body.firstname) {
                    if (req.body.surname) {
                        if (req.body.companyCode) {
                            if (req.body.companyName) {
                                const user = await createUser(
                                    req.body,
                                    userRepositoryMongo,
                                    companyRepositoryMongo
                                );
                                req.session.user = user;
                                res.status(200).json({
                                    message: 'account created',
                                    isLogged: true
                                });
                            } else {
                                res.status(401).json({
                                    message: 'The company name is missing'
                                });
                            }
                        } else {
                            res.status(401).json({
                                message: 'The company code is missing'
                            });
                        }
                    } else {
                        res.status(401).json({
                            message: 'A surname is missing'
                        });
                    }
                } else {
                    res.status(401).json({
                        message: 'A firstname is missing'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'A password is missing'
                });
            }
        } else {
            res.status(401).json({
                message: 'An email is missing'
            });
        }
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
