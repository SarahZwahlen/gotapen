import { UserType } from '../models/user';
import bcrypt from 'bcrypt';
import { createUser } from './createUser.usecase';

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

describe('Create a user account', () => {
    test('Connection succeed', async () => {
        const email = 'sarah@mail.fr';
        const password = '123';
        const surname = 'Zwn';
        const firstname = 'Sarah';

        let user: UserType;

        const getUser = async (email: string): Promise<UserType | null> => {
            return null;
        };
        const saveUser = async (
            email: string,
            surname: string,
            firstname: string,
            password: string
        ): Promise<UserType> => {
            user = await buildUser({
                email,
                surname,
                firstname,
                password
            });
            return user;
        };

        expect(
            await createUser(
                email,
                password,
                firstname,
                surname,
                saveUser,
                getUser
            )
        ).toEqual(user!);
    });

    test('Email is already used', async () => {
        const email = 'sarah@mail.fr';
        const password = '123';
        const surname = 'Zwn';
        const firstname = 'Sarah';

        let user: UserType;

        const getUser = async (email: string): Promise<UserType | null> => {
            user = await buildUser({
                email
            });
            return user;
        };
        const saveUser = async (
            email: string,
            surname: string,
            firstname: string,
            password: string
        ): Promise<UserType> => {
            user = await buildUser({
                email,
                surname,
                firstname,
                password
            });
            return user;
        };

        await expect(
            async () =>
                await createUser(
                    email,
                    password,
                    firstname,
                    surname,
                    saveUser,
                    getUser
                )
        ).rejects.toThrow('This email is already used by an other user');
    });
});
