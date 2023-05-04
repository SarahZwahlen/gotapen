import Express from 'express';
import { MongoError } from 'mongodb';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { CreateCompanyAccount } from '../../usecases/company/createCompanyAccount';

const createCompany = async (req: Express.Request, res: Express.Response) => {
    try {
        console.log(req.body);
        const newAdmin = await CreateCompanyAccount(
            req.body,
            userRepositoryMongo,
            companyRepositoryMongo
        );
        res.json({
            message: 'company created',
            user: newAdmin
        });
    } catch (error) {
        if (error instanceof MongoError) {
            if (error.code === 11000) {
                return res.json({
                    message: 'Company name already exists'
                });
            }
        }
        res.json({
            message: 'An error occured'
        });
    }
};

export default createCompany;
