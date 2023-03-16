import { buildUser } from '../../builders/builders.test.utils';
import { UserType } from '../../models/user';
import { deleteAccount } from './deleteUser.usecase';

describe('Delete user account', () => {
    test('The account is deleted', async () => {
        const user = await buildUser();
        const userId = user.id;
        let userDB: UserType[] = [
            await buildUser({ firstname: 'fleur' }),
            await buildUser({ firstname: 'coucou' }),
            user
        ];

        const getUser = async (userId: string) => {
            return user;
        };

        const deleteUser = async (userId: string) => {
            userDB = userDB.filter((user) => user.id !== userId);
            return;
        };
        await deleteAccount(userId, await getUser, await deleteUser);
        expect(userDB).not.toContain(user);
    });

    test("If user doen't exist, it throw an error", async () => {
        const user = await buildUser();
        const userId = user.id;
        let userDB: UserType[] = [
            await buildUser({ firstname: 'fleur' }),
            await buildUser({ firstname: 'coucou' }),
            user
        ];

        const getUser = async (userId: string) => {
            return null;
        };

        const deleteUser = async (userId: string) => {
            userDB = userDB.filter((user) => user.id !== userId);
            return;
        };
        await expect(
            async () => await deleteAccount(userId, getUser, deleteUser)
        ).rejects.toThrow("This user doesn't exists");
    });
});

// test si le user qui delete est bien le propriétaire du compte ou un admin
