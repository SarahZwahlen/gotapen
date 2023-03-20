import { buildUser } from '../../infrasturcture/builders/builders.test.utils';
import { UserType } from '../../infrasturcture/models/user';
import { modifyUser } from './modifyUser.usecase';
import bcrypt from 'bcrypt';

describe('Modify user', () => {
    // Tester cas nominal
    test('Happy path', async () => {
        // giver a user
        const user = await buildUser();
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test',
            firstname: 'The test',
            password: '321'
        };
        const userDB: UserType[] = [];
        userDB.push(user);

        const modifiedUser = {
            ...userDB[0],
            email: datas.email!,
            surname: datas.surname!,
            firstname: datas.firstname!
        };

        const updateUserDatas = async (datas: Partial<UserType>) => {
            let encryptedPassord = user.password;
            if (datas.password) {
                encryptedPassord = await bcrypt.hash(datas.password, 10);
            }
            userDB[0] = { ...modifiedUser, password: encryptedPassord };
            modifiedUser.password = encryptedPassord;
        };
        const getUser = async () => {
            return userDB[0];
        };
        const result = await modifyUser(
            datas,
            await getUser,
            await updateUserDatas
        );
        expect(result).toEqual(modifiedUser);
    });

    test('Partial datas', async () => {
        // giver a user
        const user = await buildUser();
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test'
        };
        const userDB: UserType[] = [];
        userDB.push(user);

        const modifiedUser = {
            ...userDB[0],
            email: datas.email!,
            surname: datas.surname!
        };
        const getUser = async () => {
            return userDB[0];
        };
        const updateUserDatas = async (datas: Partial<UserType>) => {
            userDB[0] = modifiedUser;
        };
        const result = await modifyUser(
            datas,
            await getUser,
            await updateUserDatas
        );
        expect(result).toEqual(modifiedUser);
    });

    // Forbiden datas
    test('Update forbiben datas', async () => {
        // giver a user
        const user = await buildUser();
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test',
            roles: ['admin']
        };
        const userDB: UserType[] = [];
        userDB.push(user);

        const modifiedUser = {
            ...userDB[0],
            email: datas.email!,
            surname: datas.surname!
        };

        const getUser = async () => {
            return userDB[0];
        };
        const updateUserDatas = async (datas: Partial<UserType>) => {
            userDB[0] = modifiedUser;
        };
        await expect(
            async () =>
                await modifyUser(datas, await getUser, await updateUserDatas)
        ).rejects.toThrow("You can't modify this datas");
    });

    // User doesn't exists
    test("User doesn't exists", async () => {
        // giver a user
        const user = await buildUser();
        // given new datas
        const datas: Partial<UserType> = {
            id: user.id,
            email: 'test@mail.fr',
            surname: 'Test'
        };
        const userDB: UserType[] = [];
        userDB.push(user);

        const modifiedUser = {
            ...userDB[0],
            email: datas.email!,
            surname: datas.surname!
        };
        const getUser = async () => {
            return null;
        };
        const updateUserDatas = async (datas: Partial<UserType>) => {
            userDB[0] = modifiedUser;
        };
        await expect(
            async () =>
                await modifyUser(datas, await getUser, await updateUserDatas)
        ).rejects.toThrow("This user doesn't exists");
    });
});
