import User from '../../models/user';
import bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../models/persistence/UserRepositoryInterface';
import { SupplyType } from '../../models/supply';

const userRepositoryMongo: UserRepositoryInterface = {
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
        const user = await User.findById(userId).populate('company');
        if (!user) {
            throw new Error('Id is not valid');
        }
        return user;
    },
    deleteUser: async (userId: string) => {
        await User.deleteOne({ _id: userId });
    },
    updateUser: async (userId, datas) => {
        await User.updateOne(
            { _id: userId },
            {
                ...datas
            }
        );
        if (datas.password) {
            await User.updateOne(
                { _id: userId },
                {
                    password: await bcrypt.hash(datas.password, 10)
                }
            );
        }
        return await User.findById(userId);
    },
    getBorrowedSupplies: async (userId) => {
        const user = await User.findById(userId).populate('borrowedSupplies');
        if (user?.borrowedSupplies) {
            const supplies: SupplyType[] = user?.borrowedSupplies;
            return supplies;
        } else {
            return null;
        }
    }
};

export default userRepositoryMongo;
