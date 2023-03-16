import { SupplyType } from '../models/supply';
import { buildSupply } from '../builders/builders.test.utils';

const supplyRepoInMemory = {
    getSupply: async (supplyId: string): Promise<SupplyType> => {
        const supply = await buildSupply({ id: supplyId });
        return supply;
    }
};

export { supplyRepoInMemory };
