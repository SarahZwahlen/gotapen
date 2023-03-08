import { UnexistingSupply } from '../../models/supply';
import { UserRepositoryInterface } from 'src/domain/repositories/userRepository.interface';
import { SupplyRepositoryInterface } from 'src/domain/repositories/supplyRepository.interface';

type UseCaseRequest = {
    supply: UnexistingSupply;
};

type Dependencies = {
    userRepository: UserRepositoryInterface;
    supplyRepository: SupplyRepositoryInterface;
};

const executeAddSupplyUsecase =
    ({ supplyRepository, userRepository }: Dependencies) =>
    async (params: UseCaseRequest) => {
        const user = await userRepository.getUser(params.supply.owner);
        if (!user) {
            return {
                message: 'Can not find owner in User',
            };
        }
        await supplyRepository.addSupply(params.supply);
    };

export { executeAddSupplyUsecase };
