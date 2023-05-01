import { UpdateResult } from 'mongodb';
import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { SupplyType } from '../../infrasturcture/models/supply';

const modifySupplyUseCase = async (
    supplyId: string,
    datas: Partial<
        Pick<SupplyType, 'name' | 'imagePath'> & { availability: string }
    >,
    supplyRepo: SupplyRepositoryInterface
): Promise<SupplyType | null | UpdateResult> => {
    const supplyToModify = await supplyRepo.getSupply(supplyId);
    if (supplyToModify) {
        const modifiedSupply = await supplyRepo.modifySupply(supplyId, datas);
        return modifiedSupply;
    } else {
        throw new Error("This supply doesn't exists");
    }
};

export { modifySupplyUseCase };
