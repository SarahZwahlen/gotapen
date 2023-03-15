import { SupplyType } from '../models/supply';
import { UserType } from '../models/user';
import { createNewSupply } from './addSuply.usecase';
import { buildUser } from './builders.test.utils';

describe('Create a supply and add it to the owner', () => {
    test('Add a supply to the owner succeed', async () => {
        // Giver an owner
        const owner = await buildUser();
        //Given a file name :
        const fileName = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';

        const datas = {
            name: supplyname,
            owner,
            fileName
        };

        const getUserByEmail = async (owner: UserType) => {
            const user = owner;
            return user;
        };
        const saveSupply = async (datas: {
            name: string;
            owner: UserType;
            fileName: string;
        }): Promise<SupplyType> => {
            return {
                availability: true,
                company: datas.owner.company,
                imagePath: datas.fileName,
                name: datas.name,
                owner: datas.owner
            };
        };
        expect(
            await createNewSupply(datas, saveSupply, getUserByEmail)
        ).toEqual({
            availability: true,
            company: datas.owner.company,
            imagePath: datas.fileName,
            name: datas.name,
            owner: datas.owner
        });
    });

    test("Owner doens'nt exists", async () => {
        // Giver an owner
        const owner = await buildUser();
        //Given a file name :
        const fileName = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';

        const datas = {
            name: supplyname,
            owner,
            fileName
        };

        const getUserByEmail = async (): Promise<UserType | null> => {
            return null;
        };
        const saveSupply = async (datas: {
            name: string;
            owner: UserType;
            fileName: string;
        }): Promise<SupplyType> => {
            return {
                availability: true,
                company: datas.owner.company,
                imagePath: datas.fileName,
                name: datas.name,
                owner: datas.owner
            };
        };

        await expect(
            async () => await createNewSupply(datas, saveSupply, getUserByEmail)
        ).rejects.toThrow("This user doesn't exists");
    });
});
