import { describe } from 'node:test';
import { SupplyType } from '../../models/supply';
import { buildSupply } from '../../builders/builders.test.utils';
import { deleteSupplyUsecase } from './deleteSupply.usecase';

describe('Delete a supply', () => {
    test('Delete a supply succeed', async () => {
        const supplyToDelete = await buildSupply();
        const supplyId = supplyToDelete.id;
        // Given a supplyDB
        let supplyDB: SupplyType[] = await Promise.all([
            await buildSupply({ name: 'stylo bleu' }),
            await buildSupply({ name: 'stylo vert' }),
            supplyToDelete
        ]);

        const deleteSupplyInDB = (supplyId: string) => {
            supplyDB = supplyDB.filter((supply) => supply.id !== supplyId);
            return Promise.resolve(true);
        };
        await deleteSupplyUsecase(supplyId, deleteSupplyInDB);

        expect(supplyDB).not.toContain(supplyToDelete);
    });

    test("Supply doesn't exists", async () => {
        // Given a supplyId
        const supplyToDelete = await buildSupply();
        const supplyId = supplyToDelete.id;
        // Given a supplyDB
        let supplyDB: SupplyType[] = await Promise.all([
            await buildSupply({ name: 'stylo bleu' }),
            await buildSupply({ name: 'stylo vert' }),
            supplyToDelete
        ]);

        const deleteSupplyInDB = (supplyId: string) => {
            supplyDB = supplyDB.filter(
                (supply) => supply.id !== supplyId + 'true'
            );
            return Promise.resolve(false);
        };
        const result = await deleteSupplyUsecase(supplyId, deleteSupplyInDB);

        expect(result).toBeFalsy();
    });
});
