import { buildSupply } from '../../infrasturcture/builders/builders.test.utils';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';

describe('Modify supply', () => {
    beforeEach(() => supplyRepoInMemory.reset());
    test('Happy path', async () => {
        //Given an existing supply
        const supply = await buildSupply();
        //Supply exists in database
        supplyRepoInMemory.givenExistingSupply(supply);
        // Given new datas
        const datas = {
            name: 'Style jaune',
            imagePath: 'YellowPen.jpg',
            availability: 'false'
        };

        const expectedresult = { ...supply, ...datas, availability: false };

        expect(await supplyRepoInMemory.modifySupply(supply.id, datas)).toEqual(
            expectedresult
        );
    });
});
