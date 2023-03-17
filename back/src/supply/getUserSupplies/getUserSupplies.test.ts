//Retourne bien les supplies du user
// throw l'erreur quand le user n'existe pas
// throw l'erreur quand le user n'est pas celui qui est connecté ou admin

import { buildSupply, buildUser } from '../../builders/builders.test.utils';
import { SupplyType } from '../../models/supply';
import { getUserSupplies } from './getUserSupplies.usecase';

describe("Get all user's supllies", () => {
    test('Return all the stuffs', async () => {
        // given a user
        const user = await buildUser({ firstname: 'Michel', surname: 'Jean' });
        // given an other user
        const otherUser = await buildUser({
            firstname: 'Truc',
            surname: 'Muche'
        });
        // given supplies
        const greenSupply = await buildSupply({
            name: 'greenSupply',
            owner: user
        });
        const redSupply = await buildSupply({
            name: 'redSupply',
            owner: user
        });
        const blueSupply = await buildSupply({
            name: 'blueSupply',
            owner: otherUser
        });

        const getUser = async (userId: string) => {
            return user;
        };

        const getSupplies = async (userId: string) => {
            const result = suppliesDB.filter(
                (supply) => supply.owner.id === user.id
            );
            return result;
        };
        // given  supplies DB
        const suppliesDB: SupplyType[] = [greenSupply, redSupply, blueSupply];

        const result = await getUserSupplies(
            // user.id,
            user.id,
            await getUser,
            await getSupplies
        );

        expect(result).not.toContain(blueSupply);
    });

    test("Throw error when user doesn't exists", async () => {
        // given a user
        const user = await buildUser({ firstname: 'Michel', surname: 'Jean' });
        // given an other user
        const otherUser = await buildUser({
            firstname: 'Truc',
            surname: 'Muche'
        });
        // given supplies
        const greenSupply = await buildSupply({
            name: 'greenSupply',
            owner: user
        });
        const redSupply = await buildSupply({
            name: 'redSupply',
            owner: user
        });
        const blueSupply = await buildSupply({
            name: 'blueSupply',
            owner: otherUser
        });

        const randomId = '1234567890';

        const getUser = async (userId: string) => {
            return null;
        };

        const getSupplies = async (userId: string) => {
            const result = suppliesDB.filter(
                (supply) => supply.owner.id === user.id
            );
            return result;
        };
        // given  supplies DB
        const suppliesDB: SupplyType[] = [greenSupply, redSupply, blueSupply];

        await expect(
            async () => await getUserSupplies(user.id, getUser, getSupplies)
        ).rejects.toThrow("This user doesn't exists");
    });

    // test('Throw error when the user is not authorized to do this action', async () => {
    //     // given a user
    //     const user = await buildUser({ firstname: 'Michel', surname: 'Jean' });
    //     // given an other user
    //     const otherUser = await buildUser({
    //         firstname: 'Truc',
    //         surname: 'Muche'
    //     });
    //     // Give a user who wants to acceed the datas
    //     const intruder = await buildUser({
    //         firstname: 'Intruder',
    //         surname: 'The Spy'
    //     });
    //     // given supplies
    //     const greenSupply = await buildSupply({
    //         name: 'greenSupply',
    //         owner: user
    //     });
    //     const redSupply = await buildSupply({
    //         name: 'redSupply',
    //         owner: user
    //     });
    //     const blueSupply = await buildSupply({
    //         name: 'blueSupply',
    //         owner: otherUser
    //     });

    //     const getUser = async (userId: string) => {
    //         return user;
    //     };

    //     const getSupplies = async (userId: string) => {
    //         const result = suppliesDB.filter(
    //             (supply) => supply.owner.id === user.id
    //         );
    //         return result;
    //     };
    //     // given  supplies DB
    //     const suppliesDB: SupplyType[] = [greenSupply, redSupply, blueSupply];

    //     await expect(
    //         async () =>
    //             await getUserSupplies(
    //                 // intruder.id,
    //                 user.id,
    //                 getUser,
    //                 getSupplies
    //             )
    //     ).rejects.toThrow('Unauthorized');
    // });
});
