import User from '../../models/user';
import Express from 'express';
import { MongoServerError } from 'mongodb';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        const newUser = new User({
            ...req.body,
        });
        await newUser.save();
        res.json({
            message: 'account created',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                'An error occured, please retry. Maybe some required data is missing or this email is already used.',
        });
        // Verify is user already exists
        // Datas are missing
    }
};

export default createAccount;
