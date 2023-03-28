import { beforeEach } from 'node:test';
import {
    buildSharinRequest,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import showBorrowedSupplies from './showBorrowedSupplies.usecase';

describe('Show borrowed supplies', () => {
    beforeEach(() => supplyRepoInMemory.reset());
    beforeEach(() => userRepoInMemory.reset());
    test('Happy path', async () => {
        // Givena a user
        const user = await buildUser();
        userRepoInMemory.givenExistingUser(user);
        // Given an otherUser
        const otherUser = await buildUser({ email: 'flower@power.com' });
        userRepoInMemory.givenExistingUser(otherUser);

        // Given a supply
        const supply = await buildSupply({ owner: otherUser });
        supplyRepoInMemory.givenExistingSupply(supply);
        // Given a sharing request
        const sharingRequests = await buildSharinRequest({
            applicant: user,
            sharedSupply: supply,
            sharer: otherUser
        });
        // Given an accepted sharing request
        user.borrowedSupplies = [...user.borrowedSupplies, supply];

        expect(await showBorrowedSupplies(user.id, userRepoInMemory)).toEqual(
            user.borrowedSupplies
        );
    });

    test('There is no borrowed supply', async () => {
        // Givena a user
        const user = await buildUser();
        userRepoInMemory.givenExistingUser(user);

        expect(await showBorrowedSupplies(user.id, userRepoInMemory)).toBe(
            null
        );
    });
});
