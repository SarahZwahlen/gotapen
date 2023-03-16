/// est ce que le supply existe ?
// est-ce que le supply est retourné =

import { buildSupply } from '../../builders/builders.test.utils';
import { SupplyType } from '../../models/supply';
import { showSupplyUseCase } from './showSupply.usecase';

describe('Show supply', () => {
    test('The supply exists', async () => {
        const supply = await buildSupply();
        const supplyID = supply.id;

        const getSupply = async (): Promise<SupplyType> => {
            return supply;
        };
        expect(await showSupplyUseCase(supplyID, getSupply)).toEqual(supply);
    });

    test("the supply doesn't exists", async () => {
        const supply = await buildSupply();
        const supplyID = supply.id;
        const getSupply = async (): Promise<null> => {
            return null;
        };

        expect(await showSupplyUseCase(supplyID, getSupply)).toBe(null);
    });
});
