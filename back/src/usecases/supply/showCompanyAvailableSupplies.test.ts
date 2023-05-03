import {
    buildCompany,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { companyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/company.repository.inMemory';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import showCompanyAvailableSupplies from './showCompanyAvailableSupplies.usecase';

describe('Show company available supplies', () => {
    beforeEach(() => companyRepoInMemory.reset());
    beforeEach(() => userRepoInMemory.reset());
    beforeEach(() => supplyRepoInMemory.reset());

    test('Happy path', async () => {
        // Given a user
        const loggedUser = await buildUser();

        //Givent a second user
        const secondUser = await buildUser({
            email: 'second@user.com',
            firstname: 'jean',
            surname: 'michel'
        });

        // given a company
        const company = await buildCompany();

        loggedUser.company = company;
        secondUser.company = company;

        // given supplies
        const supplyOne = await buildSupply({
            name: 'Supply one',
            availability: true,
            owner: loggedUser,
            company: company
        });

        const supplyTwo = await buildSupply({
            name: 'Supply two',
            availability: false,
            owner: secondUser,
            company: company
        });

        const supplyThree = await buildSupply({
            name: 'Supply three',
            availability: true,
            owner: secondUser,
            company: company
        });

        userRepoInMemory.givenExistingUser(loggedUser);
        userRepoInMemory.givenExistingUser(secondUser);
        supplyRepoInMemory.givenExistingSupply(supplyOne);
        supplyRepoInMemory.givenExistingSupply(supplyTwo);
        supplyRepoInMemory.givenExistingSupply(supplyThree);
        companyRepoInMemory.givenExistingCompany(company);

        expect(
            showCompanyAvailableSupplies(
                loggedUser.id,
                userRepoInMemory,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).not.toContain(supplyTwo);
        expect(
            showCompanyAvailableSupplies(
                loggedUser.id,
                userRepoInMemory,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).not.toContain(supplyThree);
    });

    test("Company doen't exists", async () => {
        // Given a user
        const loggedUser = await buildUser();

        //Givent a second user
        const secondUser = await buildUser({
            email: 'second@user.com',
            firstname: 'jean',
            surname: 'michel'
        });

        // given a company
        const company = await buildCompany();

        loggedUser.company = company;
        secondUser.company = company;

        // given supplies
        const supplyOne = await buildSupply({
            name: 'Supply one',
            availability: true,
            owner: loggedUser,
            company: company
        });

        const supplyTwo = await buildSupply({
            name: 'Supply two',
            availability: false,
            owner: secondUser,
            company: company
        });

        const supplyThree = await buildSupply({
            name: 'Supply three',
            availability: true,
            owner: secondUser,
            company: company
        });

        userRepoInMemory.givenExistingUser(loggedUser);
        userRepoInMemory.givenExistingUser(secondUser);
        supplyRepoInMemory.givenExistingSupply(supplyOne);
        supplyRepoInMemory.givenExistingSupply(supplyTwo);
        supplyRepoInMemory.givenExistingSupply(supplyThree);

        await expect(async () =>
            showCompanyAvailableSupplies(
                loggedUser.id,
                userRepoInMemory,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).rejects.toThrow("This company doesn't exist");
    });

    test("User doen't exists", async () => {
        // Given a user
        const loggedUser = await buildUser();

        //Givent a second user
        const secondUser = await buildUser({
            email: 'second@user.com',
            firstname: 'jean',
            surname: 'michel'
        });

        // given a company
        const company = await buildCompany();

        loggedUser.company = company;
        secondUser.company = company;

        // given supplies
        const supplyOne = await buildSupply({
            name: 'Supply one',
            availability: true,
            owner: loggedUser,
            company: company
        });

        const supplyTwo = await buildSupply({
            name: 'Supply two',
            availability: false,
            owner: secondUser,
            company: company
        });

        const supplyThree = await buildSupply({
            name: 'Supply three',
            availability: true,
            owner: secondUser,
            company: company
        });

        userRepoInMemory.givenExistingUser(secondUser);
        supplyRepoInMemory.givenExistingSupply(supplyOne);
        supplyRepoInMemory.givenExistingSupply(supplyTwo);
        supplyRepoInMemory.givenExistingSupply(supplyThree);
        companyRepoInMemory.givenExistingCompany(company);

        await expect(async () =>
            showCompanyAvailableSupplies(
                loggedUser.id,
                userRepoInMemory,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).rejects.toThrow("This user doesn't exist");
    });
});
