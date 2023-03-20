/// est ce que le supply existe ?
// est-ce que le supply est retourné =

import { buildSupply } from '../infrasturcture/builders/builders.test.utils';
import { supplyRepoInMemory } from '../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import { showSupplyUsecaseCreator } from './showSupply.usecase';
// import { showSupplyUseCase } from './showSupply.usecase';

describe('Show supply usecase', () => {
    const useCase = showSupplyUsecaseCreator(supplyRepoInMemory);

    beforeEach(() => {
        supplyRepoInMemory.reset();
    });

    test('The supply exists', async () => {
        const supply = await buildSupply({ id: '456' });
        supplyRepoInMemory.givenExistingSupply(supply);

        expect(await useCase(supply.id)).toEqual(
            supplyRepoInMemory.supplies[0]
        );
    });

    test("the supply doesn't exists", async () => {
        const supply = await buildSupply({ id: '456' });
        const supplyID = supply.id;

        expect(await useCase(supplyID)).toBe(null);
    });
});
