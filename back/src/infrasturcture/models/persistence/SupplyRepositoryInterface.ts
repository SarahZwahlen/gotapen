import { CompanyType } from '../company';
import { SupplyType } from '../supply';

type SupplyRepositoryInterface = {
    getSupply: (supplyId: string) => Promise<SupplyType | null>;
    addSupply: (
        data: Pick<SupplyType, 'name' | 'owner'> & { fileName: string }
    ) => Promise<SupplyType>;
    deleteSupplyAndAllItsRef: (supplyId: string) => Promise<boolean>;
    getSupplies: (userId: string) => Promise<SupplyType[]>;
    getAllCompynySupplies: (companyId: string) => Promise<SupplyType[]>;
    getUserAvailableSupplies: (company: CompanyType) => Promise<SupplyType[]>;
};

export type { SupplyRepositoryInterface };
