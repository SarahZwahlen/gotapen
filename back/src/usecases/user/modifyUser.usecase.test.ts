import { buildUser } from '../../infrasturcture/builders/builders.test.utils';
import { UserType } from '../../infrasturcture/models/user';
import { modifyUser } from './modifyUser.usecase';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';

describe('Modify user', () => {
    beforeEach(() => userRepoInMemory.reset());
    // Tester cas nominal
    test('Happy path', async () => {
        // giver a user
        const user = await buildUser();
        userRepoInMemory.givenExistingUser(user);
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test',
            firstname: 'The test',
            password: '321'
        };

        const result = await modifyUser(user.id, datas, userRepoInMemory);
        const modifiedUser = {
            ...userRepoInMemory.users[0],
            email: datas.email!,
            surname: datas.surname!,
            firstname: datas.firstname!
        };

        expect(result).toEqual(modifiedUser);
    });

    test('Partial datas', async () => {
        // giver a user
        const user = await buildUser();
        userRepoInMemory.givenExistingUser(user);
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test'
        };

        const modifiedUser = {
            ...userRepoInMemory.users[0],
            email: datas.email!,
            surname: datas.surname!
        };
        const result = await modifyUser(user.id, datas, userRepoInMemory);
        expect(result).toEqual(modifiedUser);
    });

    // Forbiden datas
    test('Update forbidden datas', async () => {
        // giver a user
        const user = await buildUser();
        userRepoInMemory.givenExistingUser(user);
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test',
            roles: ['admin']
        };
        const modifiedUser = {
            ...userRepoInMemory.users[0],
            email: datas.email!,
            surname: datas.surname!
        };
        const result = await modifyUser(user.id, datas, userRepoInMemory);
        expect(result).toEqual(modifiedUser);
    });

    // User doesn't exists
    test("User doesn't exists", async () => {
        // giver a user
        const user = await buildUser();
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test'
        };
        await expect(
            async () => await modifyUser(user.id, datas, userRepoInMemory)
        ).rejects.toThrow("This user doesn't exists");
    });
});
