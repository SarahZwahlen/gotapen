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
    }
};

export default userRepositoryMongo;
