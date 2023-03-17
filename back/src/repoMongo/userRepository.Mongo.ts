import User from '../models/user';
import bcrypt from 'bcrypt';

const userRepositoryMongo = {
    saveUser: async (datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
    }) => {
        const user = new User({
            email: datas.email,
            firstname: datas.firstname,
            surname: datas.surname,
            password: await bcrypt.hash(datas.password, 10)
        });

        await user.save();

        return user;
    },
    getUserByEmail: async (email: string) => {
        const user = await User.findOne({ email });
        return user;
    },
    getUserById: async (userId: string) => {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Id is not valid');
        }
        return user;
    },
    deleteUser: async (userId: string) => {
        await User.deleteOne({ _id: userId });
    }
};

export default userRepositoryMongo;
