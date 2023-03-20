import { SupplyRepositoryInterface } from '../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { SupplyType } from '../infrasturcture/models/supply';

type ShowSupplyUsecase = (
    supplyId: string
    // repo: SupplyRepositoryInterface
) => Promise<SupplyType | null>;

const showSupplyUsecaseCreator =
    (repo: SupplyRepositoryInterface): ShowSupplyUsecase =>
    async (supplyId) => {
        const supply = await repo.getSupply(supplyId);

        return supply;
    };
// const showSupplyUseCase: ShowSupplyUsecase = async (supplyId, repo) => {
//     const supply = await repo.getSupply(supplyId);

//     return supply;
// };

export type { ShowSupplyUsecase };
export { showSupplyUsecaseCreator };
