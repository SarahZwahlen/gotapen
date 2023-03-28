import {
    buildCompany,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { createNewSupply } from './addSuply.usecase';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import companyRepoInMemory from '../../infrasturcture/repositories/repositoryInMemory/company.repository.inMemory';

describe('Create a supply and add it to the owner', () => {
    beforeEach(() => {
        userRepoInMemory.reset();
        supplyRepoInMemory.reset();
        companyRepoInMemory.reset();
    });
    test('Add a supply to the owner succeed', async () => {
        // Giver an owner
        const owner = await buildUser();
        userRepoInMemory.givenExistingUser(owner);
        //Given a file name :
        const fileName = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';
        // given a company
        const company = await buildCompany();
        companyRepoInMemory.givenExistingCompany(company);

        owner.company = company;

        const datas = {
            name: supplyname,
            imagePath: fileName
        };
        //result
        const result = await createNewSupply(
            owner.id,
            datas,
            userRepoInMemory,
            companyRepoInMemory,
            supplyRepoInMemory
        );
        // Expected result
        const expectedResult = await buildSupply({
            id: result.id,
            owner,
            company,
            name: supplyname,
            imagePath: `public/images/${fileName}`
        });

        expect(expectedResult).toEqual(result);
    });

    test("Owner doens'nt exists", async () => {
        // Giver an owner
        const owner = await buildUser();
        //Given a file name :
        const fileName = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';
        // given a company
        const company = await buildCompany();
        companyRepoInMemory.givenExistingCompany(company);

        owner.company = company;

        const datas = {
            name: supplyname,
            imagePath: fileName
        };

        await expect(
            async () =>
                await createNewSupply(
                    owner.id,
                    datas,
                    userRepoInMemory,
                    companyRepoInMemory,
                    supplyRepoInMemory
                )
        ).rejects.toThrow("This user doesn't exists");
    });
    test("Company doens'nt exists", async () => {
        // Giver an owner
        const owner = await buildUser();
        userRepoInMemory.givenExistingUser(owner);

        //Given a file name :
        const fileName = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';
        // given a company
        const company = await buildCompany();

        owner.company = company;

        const datas = {
            name: supplyname,
            imagePath: fileName
        };

        await expect(
            async () =>
                await createNewSupply(
                    owner.id,
                    datas,
                    userRepoInMemory,
                    companyRepoInMemory,
                    supplyRepoInMemory
                )
        ).rejects.toThrow("This company doesn't exists");
    });
});
