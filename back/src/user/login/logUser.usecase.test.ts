import { UserType } from '../../models/user';
import { logUser } from './logUser.usecase';
import { buildUser } from '../../builders/builders.test.utils';

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
