import { UserType } from '../models/user';
import bcrypt from 'bcrypt';

const buildUser = async (params: Partial<UserType> = {}): Promise<UserType> => {
    const user = {
        email: 'sarah@mail.fr',
        password: '123',
        surname: 'Zwn',
        firstname: 'Sarah',
        roles: ['user'],
        borrowedSupplies: [],
        sentSharingRequests: [],
        company: {
            employees: [],
            joinCode: '123',
            name: 'Totoland'
        },
        supplies: [],
        receivedSharingRequests: [],
        ...params
    };
    user.password = await bcrypt.hash(user.password, 10);

    return user;
};

export { buildUser };
