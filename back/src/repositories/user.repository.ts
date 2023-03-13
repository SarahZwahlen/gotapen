import { MongoServerError } from 'mongodb';
import User, { UserType } from '../models/user';
import bcrypt from 'bcrypt';

const userRepository = {
    createUser: async (
        params: Pick<UserType, 'email' | 'firstname' | 'surname' | 'password'>
    ): Promise<UserType> => {
        const newUser = new User({
            ...params,
            password: await bcrypt.hash(params.password, 10)
        });
        try {
            const createdUser = await newUser.save();
            return createdUser.toObject();
        } catch (error) {
            if (error instanceof MongoServerError) {
                if (error.code === 11000) {
                    throw new Error(`User ${params.email} already exists`);
                }
            }

            throw error;
        }
    }
};

export { userRepository };
