import User from '../../models/user';
import bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../models/persistence/UserRepositoryInterface';
import { SupplyType } from '../../models/supply';

const userRepositoryMongo: UserRepositoryInterface = {
    saveUser: async (datas) => {
        if (datas.roles) {
            const user = new User({
                email: datas.email,
                firstname: datas.firstname,
                surname: datas.surname,
                company: datas.companyId,
                password: await bcrypt.hash(datas.password!, 10),
                roles: datas.roles
            });

            await user.save();
            return user;
        } else {
            const user = new User({
                email: datas.email,
                firstname: datas.firstname,
                surname: datas.surname,
                company: datas.companyId,
                password: await bcrypt.hash(datas.password!, 10)
            });

            await user.save();
            return user;
        }
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
    },
    logUser: async (email, password) => {
        const user = await User.findOne({ email: email });

        if (user) {
            const result = await bcrypt.compare(password, user.password);

            if (result) {
                return user;
            } else {
                throw new Error('Wrong password');
            }
        } else {
            throw new Error("This user does'nt exists");
        }
    }
};

export default userRepositoryMongo;
