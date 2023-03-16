import { SupplyType } from '../../models/supply';

const showSupplyUseCase = (
    supplyId: string,
    getSupply: (supplyId: string) => Promise<SupplyType | null>
): Promise<SupplyType | null> => {
    const supply = getSupply(supplyId);

    return supply;
};

export { showSupplyUseCase };
