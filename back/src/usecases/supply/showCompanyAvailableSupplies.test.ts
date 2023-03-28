import {
    buildCompany,
    buildSupply
} from '../../infrasturcture/builders/builders.test.utils';
import companyRepoInMemory from '../../infrasturcture/repositories/repositoryInMemory/company.repository.inMemory';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import showCompanyAvailableSupplies from './showCompanyAvailableSupplies.usecase';

describe('Show company available supplies', () => {
    beforeEach(() => companyRepoInMemory.reset());
    test('Happy path', async () => {
        // given a company
        const company = await buildCompany();
        companyRepoInMemory.givenExistingCompany(company);
        // given a supply
        const supplyOne = await buildSupply({
            name: 'Supply one',
            availability: true
        });
        const supplyTwo = await buildSupply({
            name: 'Supply two',
            availability: false
        });
        supplyRepoInMemory.givenExistingSupply(supplyOne);
        supplyRepoInMemory.givenExistingSupply(supplyTwo);

        expect(
            showCompanyAvailableSupplies(
                company.id,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).not.toContain(supplyTwo);
    });

    test("Company doen't exists", async () => {
        // given a company
        const company = await buildCompany();
        // given a supply
        const supplyOne = await buildSupply({
            name: 'Supply one',
            availability: true
        });
        const supplyTwo = await buildSupply({
            name: 'Supply two',
            availability: false
        });
        supplyRepoInMemory.givenExistingSupply(supplyOne);
        supplyRepoInMemory.givenExistingSupply(supplyTwo);

        await expect(async () =>
            showCompanyAvailableSupplies(
                company.id,
                companyRepoInMemory,
                supplyRepoInMemory
            )
        ).rejects.toThrow("This company doesn't exist");
    });
});
