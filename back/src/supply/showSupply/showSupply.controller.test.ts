import { buildSupply, buildUser } from '../../builders/builders.test.utils';
import { testController } from '../../builders/test.controller';
import { supplyRepoInMemory } from '../../repositoryInMemory/supply.respository.inMemory';
import { showSupplyCreator } from './showSupply.controller';
import { showSupplyUsecaseCreator } from './showSupply.usecase';

describe('Showsupply', () => {
    const useCase = showSupplyUsecaseCreator(supplyRepoInMemory);

    beforeEach(() => {
        supplyRepoInMemory.reset();
    });

    test('Nominal case', async () => {
        supplyRepoInMemory.givenExistingSupply(
            await buildSupply({
                id: '123'
            })
        );

        const res = await testController(showSupplyCreator(useCase), {
            method: 'POST',
            body: {
                supplyId: '123'
            },
            session: {
                user: await buildUser()
            }
        });
        expect(res._getJSONData()).toEqual({
            message: 'Here is the supply',
            supply: supplyRepoInMemory.supplies[0]
        });
    });

    test('User is not authentified', async () => {
        supplyRepoInMemory.givenExistingSupply(
            await buildSupply({
                id: '123'
            })
        );

        const res = await testController(showSupplyCreator(useCase), {
            method: 'POST',
            body: {
                supplyId: '123'
            },
            session: {}
        });

        expect(res._getJSONData()).toEqual({
            message: 'User is not authentified'
        });
    });
});
