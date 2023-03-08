import { supplyRepositoryInMemory } from '../../../infrastructure/repositories/supply/supplyRepository.inMemory';
import { userRepositoryInMemory } from '../../../infrastructure/repositories/user/userRepository.inMemory';
import { executeAddSupplyUsecase } from './addSupply.usecase';

describe('add supply use case', () => {
    const useCase = executeAddSupplyUsecase({
        supplyRepository: supplyRepositoryInMemory,
        userRepository: userRepositoryInMemory,
    });
    beforeEach(() => {
        supplyRepositoryInMemory.reset();
        userRepositoryInMemory.reset();
    });

    describe('Happy paths', () => {
        test('it works', async () => {
            // Given I have a user
            userRepositoryInMemory.givenExistingUser({
                email: 'titi@toto.com',
                firstname: 'Jean',
                surname: 'Valjean',
                id: 'Titi',
                password: 'pass',
            });

            // When I try to add a supply
            const usecaseResult = await useCase({
                supply: {
                    availability: true,
                    name: 'Stylo rouge',
                    owner: 'Titi',
                },
            });

            // Then result to be ok
            expect(usecaseResult).toBeUndefined();
            // And the supply has been created
            expect(supplyRepositoryInMemory.supplies[0]).toEqual({
                availability: true,
                name: 'Stylo rouge',
                owner: 'Titi',
                id: expect.any(String),
            });
        });
    });

    describe('Errors', () => {
        test('It returns an error when the owner does not exist', async () => {
            // When I try to add a supply with a non-existing owner
            const usecaseResult = await useCase({
                supply: {
                    availability: true,
                    name: 'Stylo rouge',
                    owner: 'Titi',
                },
            });

            // Then result is an error
            expect(usecaseResult).toEqual({
                message: 'Can not find owner in User',
            });
            // And the supply has not been created
            expect(supplyRepositoryInMemory.supplies.length).toEqual(0);
        });
    });
});
