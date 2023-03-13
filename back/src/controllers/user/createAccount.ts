import Express from 'express';
import { userRepository } from '../../repositories/user.repository';

const createAccount = async (req: Express.Request, res: Express.Response) => {
    try {
        await userRepository.createUser(req.body);
        res.json({
            message: 'account created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                'An error occured, please retry. Maybe some required data is missing or this email is already used.'
        });
        // Verify is user already exists
        // Datas are missing
    }
};

export default createAccount;
