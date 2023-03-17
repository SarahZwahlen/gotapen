import { buildUser } from '../../builders/builders.test.utils';
import { UserType } from '../../models/user';
import { getUserDatas } from './getUserDatas.usecase';

describe('Get user datas', () => {
    test('Happy path', async () => {
        // Give two users
        const user = await buildUser();
        const otherUser = await buildUser({
            firstname: 'Jean-Michel',
            surname: 'Apeuprès'
        });
        // Givent a user DB
        const userDB: UserType[] = [user, otherUser];

        const getUser = async (userId: string): Promise<UserType | null> => {
            let findedUser;

            userDB.forEach((user) => {
                if (user.id === userId) {
                    findedUser = user;
                }
            });

            if (findedUser === undefined) {
                findedUser = null;
            }

            return findedUser;
        };

        expect(await getUserDatas(user.id, await getUser)).toBe(user);
    });

    test("The user doesn't exists", async () => {
        const user = await buildUser();
        const otherUser = await buildUser({
            firstname: 'Jean-Michel',
            surname: 'Apeuprès'
        });
        // Givent a user DB
        const userDB: UserType[] = [user, otherUser];

        const getUser = async (userId: string): Promise<UserType | null> => {
            let findedUser;

            userDB.forEach((user) => {
                if (user.id === '2') {
                    findedUser = user;
                }
            });

            if (findedUser === undefined) {
                findedUser = null;
            }

            return findedUser;
        };
        await expect(
            async () => await getUserDatas(user.id, getUser)
        ).rejects.toThrow("This user doesn't exists");
    });
});
