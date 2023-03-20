import { UserType } from '../../infrasturcture/models/user';
import bcrypt from 'bcrypt';

const logUser = async (
    email: string,
    password: string,
    getUser: (email: string) => Promise<UserType | null>
): Promise<UserType> => {
    const user = await getUser(email);

    if (!user) {
        throw new Error("This user does'nt exists");
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
        throw new Error('Wrong password');
    }

    return user;
};

export { logUser };
