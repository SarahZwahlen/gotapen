import {
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import { deleteAccount } from './deleteUser.usecase';

describe('Delete user account', () => {
    beforeEach(() => userRepoInMemory.reset());
    beforeEach(() => supplyRepoInMemory.reset());
    test('The account is deleted', async () => {
        //Given users
        const user = await buildUser();
        const secondUser = await buildUser({ firstname: 'fleur' });
        const thirdUser = await await buildUser({ firstname: 'coucou' });

        //Users got a supplies
        const supply = await buildSupply({ owner: user });
        const secondSupply = await buildSupply({ owner: secondUser });

        //Supplies exists in database
        supplyRepoInMemory.givenExistingSupply(supply);
        supplyRepoInMemory.givenExistingSupply(secondSupply);

        //Users exist in database
        userRepoInMemory.givenExistingUser(user);
        userRepoInMemory.givenExistingUser(secondUser);
        userRepoInMemory.givenExistingUser(thirdUser);

        await deleteAccount(user.id, userRepoInMemory);
        expect(userRepoInMemory.users).not.toContain(user);
        expect(supplyRepoInMemory.supplies).not.toContain(supply);
    });

    test("If user doen't exist, it throw an error", async () => {
        //Given users
        const user = await buildUser();
        const secondUser = await buildUser({ firstname: 'fleur' });
        const thirdUser = await await buildUser({ firstname: 'coucou' });

        //Only some users exist in database
        userRepoInMemory.givenExistingUser(secondUser);
        userRepoInMemory.givenExistingUser(thirdUser);

        await expect(
            async () => await deleteAccount(user.id, userRepoInMemory)
        ).rejects.toThrow("This user doesn't exists");
    });
});
