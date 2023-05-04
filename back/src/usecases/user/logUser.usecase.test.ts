import { buildUser } from '../../infrasturcture/builders/builders.test.utils';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';

describe('Log a user', () => {
    beforeEach(() => userRepoInMemory.reset());
    test('Connection succeed', async () => {
        //Given connection datas
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '123';
        //Given a user
        const user = await buildUser({
            email: givenEmail,
            password: givenPassword
        });
        //User exists in database
        userRepoInMemory.givenExistingUser(user);

        expect(
            await userRepoInMemory.logUser(givenEmail, givenPassword)
        ).toEqual(user!);
    });

    test('Wrong password', async () => {
        //Given connection datas
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '123';
        //Given a user
        const user = await buildUser({
            email: givenEmail,
            password: 'unmatching-password'
        });
        //User exists in database
        userRepoInMemory.givenExistingUser(user);

        await expect(
            async () =>
                await userRepoInMemory.logUser(givenEmail, givenPassword)
        ).rejects.toThrow('Wrong password');
    });

    test("User doen't exists", async () => {
        //Given connection datas
        const givenEmail = 'sarah@mail.fr';
        const givenPassword = '123';
        //Given a user
        const user = await buildUser({
            email: givenEmail,
            password: givenPassword
        });

        await expect(
            async () =>
                await userRepoInMemory.logUser(givenEmail, givenPassword)
        ).rejects.toThrow("This user does'nt exists");
    });
});
