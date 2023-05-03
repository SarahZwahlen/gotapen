import { createUser } from './createUser.usecase';
import {
    buildCompany,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import { companyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/company.repository.inMemory';

describe('Create a user account', () => {
    beforeEach(() => companyRepoInMemory.reset());
    beforeEach(() => userRepoInMemory.reset());

    test('Connection succeed', async () => {
        //Given received user datas
        const datas = {
            email: 'sarah@mail.fr',
            password: '123',
            surname: 'Zwn',
            firstname: 'Sarah',
            companyName: 'Truc',
            companyCode: '123'
        };
        //Given a company
        const company = await buildCompany({
            name: datas.companyName,
            joinCode: datas.companyCode
        });

        //The company exists in database
        companyRepoInMemory.givenExistingCompany(company);

        const newUser = await createUser(
            datas,
            userRepoInMemory,
            companyRepoInMemory
        );

        const expectUser = await buildUser({
            id: newUser.id,
            company: newUser.company,
            password: newUser.password,
            firstname: newUser.firstname,
            surname: newUser.surname,
            email: newUser.email
        });

        expect(newUser).toEqual(expectUser);
        expect(company.employees).toContain(newUser);
    });

    test('Email is already used', async () => {
        //Given received user datas
        const datas = {
            email: 'sarah@mail.fr',
            password: '123',
            surname: 'Zwn',
            firstname: 'Sarah',
            companyName: 'Truc',
            companyCode: '123'
        };
        //Given an other user
        const otherUser = await buildUser({ email: 'sarah@mail.fr' });

        //Second user already exists in database
        userRepoInMemory.givenExistingUser(otherUser);
        //Given a company
        const company = await buildCompany({
            name: datas.companyName,
            joinCode: datas.companyCode
        });

        //The company exists in database
        companyRepoInMemory.givenExistingCompany(company);

        await expect(
            async () =>
                await createUser(datas, userRepoInMemory, companyRepoInMemory)
        ).rejects.toThrow('This email is already used by an other user');
    });

    test("The company doesn't exists", async () => {
        //Given received user datas
        const datas = {
            email: 'sarah@mail.fr',
            password: '123',
            surname: 'Zwn',
            firstname: 'Sarah',
            companyName: 'Truc',
            companyCode: '123'
        };

        await expect(
            async () =>
                await createUser(datas, userRepoInMemory, companyRepoInMemory)
        ).rejects.toThrow('This company name is not valid');
    });
});
