import {
    clearDatabase,
    connectDBForTesting,
    disconnectDBForTesting
} from '../../tests/connectDBForTesting';
import User from '../models/user';
import { userRepository } from './user.repository';

describe('UserRepositiory', () => {
    afterEach(async () => {
        await clearDatabase();
    });
    beforeAll(async () => await connectDBForTesting());
    afterAll(async () => await disconnectDBForTesting());

    describe('CreateUser', () => {
        describe('Nominal cases', () => {
            test('it creates a user when it does not already exist', async () => {
                // Given I have a user to create
                const userToCreate = {
                    email: 'my-user@gmail.com',
                    firstname: 'Jean',
                    surname: 'Valjean',
                    password: '123'
                };

                // when I try to create a user
                const result = await userRepository.createUser(userToCreate);

                // Then the user is created
                expect(result).toEqual(
                    (await User.findOne({
                        email: userToCreate.email
                    }))!.toObject()
                );

                // And the user password is encrypted
                expect(result.password).not.toEqual(userToCreate.password);
            });

            test('it returns an error when the user already exists', async () => {
                // Given I already have a user
                const existingUser = {
                    email: 'my-user@gmail.com',
                    firstname: 'Jean',
                    surname: 'Valjean',
                    password: '123'
                };
                await User.create(existingUser);

                // When I try to create this user again, Then it returns an error
                await expect(
                    async () => await userRepository.createUser(existingUser)
                ).rejects.toThrow(`User ${existingUser.email} already exists`);
            });
        });
    });
});
