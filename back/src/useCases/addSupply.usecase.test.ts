import { addSupply } from './addSuply.usecase';
import { buildUser } from './user.usercase.utils';

describe('Create a supply and add it to the owner', () => {
    test('Add a supply to the owner succeed', async () => {
        // Giver an owner
        const owner = await buildUser();
        //Given a file name :
        const filename = 'fleur.jpg';
        // Given a supply name :
        const supplyname = 'Stylo vert';

        const getUser = () => {
            const user = owner;
            return user;
        };
        expect(addSupply(supplyname, owner, filename, getUser));
    });
});
