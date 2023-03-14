import { UserType } from '../models/user';
import bcrypt from 'bcrypt';
import { logUser } from './logUser.usecase';

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

describe('Log a user', () => {
    test('Connection succeed', async () => {
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '123';
        let user: UserType;
        const getUser = async (email: string): Promise<UserType> => {
            user = await buildUser({
                email,
                password: givenPassword
            });
            return user;
        };

        expect(await logUser(givenEmail, givenPassword, getUser)).toEqual(
            user!
        );
    });

    test('Wrong password', async () => {
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '321';
        let user: UserType;
        const getUser = async (email: string): Promise<UserType> => {
            user = await buildUser({
                email,
                password: 'unmatching-password'
            });
            return user;
        };

        await expect(
            async () => await logUser(givenEmail, givenPassword, getUser)
        ).rejects.toThrow('Wrong password');
    });

    test("User doen't exists", async () => {
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '123';
        let user: UserType | null;
        const getUser = async (): Promise<UserType | null> => {
            user = null;
            return user;
        };

        await expect(
            async () => await logUser(givenEmail, givenPassword, getUser)
        ).rejects.toThrow("This user does'nt exists");
    });
});
