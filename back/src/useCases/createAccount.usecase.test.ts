import { UserType } from '../models/user';
import { createUser } from './createUser.usecase';
import { buildUser } from './builders.test.utils';

describe('Create a user account', () => {
    test('Connection succeed', async () => {
        const datas = {
            email: 'sarah@mail.fr',
            password: '123',
            surname: 'Zwn',
            firstname: 'Sarah'
        };

        let user: UserType;

        const getUser = async (email: string): Promise<UserType | null> => {
            return null;
        };
        const saveUser = async (datas: {
            email: string;
            surname: string;
            firstname: string;
            password: string;
        }): Promise<UserType> => {
            user = await buildUser({
                email: datas.email,
                surname: datas.surname,
                firstname: datas.firstname,
                password: datas.password
            });
            return user;
        };

        expect(await createUser(datas, saveUser, getUser)).toEqual(user!);
    });

    test('Email is already used', async () => {
        const datas = {
            email: 'sarah@mail.fr',
            password: '123',
            surname: 'Zwn',
            firstname: 'Sarah'
        };

        let user: UserType;

        const getUser = async (email: string): Promise<UserType | null> => {
            user = await buildUser({
                email
            });
            return user;
        };
        const saveUser = async (datas: {
            email: string;
            surname: string;
            firstname: string;
            password: string;
        }): Promise<UserType> => {
            user = await buildUser({
                email: datas.email,
                surname: datas.surname,
                firstname: datas.firstname,
                password: datas.password
            });
            return user;
        };

        await expect(
            async () => await createUser(datas, saveUser, getUser)
        ).rejects.toThrow('This email is already used by an other user');
    });
});
