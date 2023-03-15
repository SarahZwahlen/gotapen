import { SupplyType } from '../models/supply';
import { buildCompany, buildUser, buildSupply } from './builders.test.utils';
import { deleteSupplyUsecase } from './delteSupply.usecase';

describe('Delete a supply', () => {
    test('Delete a supply succeed', async () => {
        // Given a user
        const user = await buildUser();
        // Given a company
        const company = await buildCompany();
        // Given a supplyId
        const supplyId = '123456';
        const supplyToDelete = await buildSupply({ id: supplyId });

        // Given a supplyDB
        let supplyDB: SupplyType[] = await Promise.all([
            await buildSupply({ name: 'stylo bleu' }),
            await buildSupply({ name: 'stylo vert' }),
            supplyToDelete
        ]);

        let deleted = false;

        const deleteSupplyInDB = (supplyId: string) => {
            deleted = true;
            supplyDB = supplyDB.filter((s) => s.id !== supplyId);
            return Promise.resolve(true);
        };

        await deleteSupplyUsecase(supplyId, deleteSupplyInDB);
        // Le supply ne doit plus exister en DB
        // Le supply ne doit plus exister dans aucune SR => Supprimer la SR associée si besoin
        expect(supplyDB).not.toContain(supplyToDelete);
    });

    test("Supply doesn't exists", () => {});

    test('Logged user and supply owner are different', () => {});
});
