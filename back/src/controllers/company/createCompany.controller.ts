import Company from '../../infrasturcture/models/company';
import bcrypt from 'bcrypt';
import Express from 'express';
import { MongoError } from 'mongodb';

const createCompany = async (req: Express.Request, res: Express.Response) => {
    try {
        const hashedJoinCode = await bcrypt.hash(req.body.joinCode, 10);

        const newCompany = new Company({
            ...req.body,
            joinCode: hashedJoinCode
        });
        await newCompany.save();
        res.json({
            message: 'company created'
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
