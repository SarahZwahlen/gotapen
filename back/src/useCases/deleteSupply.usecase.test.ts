import { buildCompany, buildUser, buildSupply } from './builders.test.utils';

describe('Delete a supply', () => {
    test('Delete a supply succeed', async () => {
        // Given a user
        const user = await buildUser();
        // Given a company
        const company = await buildCompany();
        // Given a supplyId
        const supplyId = '123456';

        const supply = buildSupply({ supplyId });
        // Given a supplyDB
        const supplyDB = [
            await buildSupply({ name: 'stylo bleu' }),
            await buildSupply({ name: 'stylo vert' }),
            supply
        ];

        const deleteSupplyInDB = (supplydId) => {
            const supplyToDeleteIndex = indexOf()
        };
        // Le supply ne doit plus exister en DB
        // Le supply ne doit plus exister dans aucune SR => Supprimer la SR associée si besoin
    });

    test("Supply doesn't exists", () => {});

    test('Logged user and supply owner are different', () => {});
});
