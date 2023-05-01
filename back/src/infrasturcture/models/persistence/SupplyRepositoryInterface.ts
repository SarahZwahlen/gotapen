import { UpdateResult } from 'mongodb';
import { CompanyType } from '../company';
import { SupplyType } from '../supply';
import { UserType } from '../user';

type SupplyRepositoryInterface = {
    getSupply: (supplyId: string) => Promise<SupplyType | null>;
    addSupply: (
        name: string,
        owner: UserType,
        company: CompanyType,
        imagePath: string
    ) => Promise<SupplyType>;
    deleteSupplyAndAllItsRef: (supplyId: string) => Promise<boolean>;
    getSupplies: (userId: string) => Promise<SupplyType[]>;
    getAllCompynySupplies: (companyId: string) => Promise<SupplyType[]>;
    getCompanyAvailableSupplies: (
        company: CompanyType,
        userId: string
    ) => Promise<SupplyType[] | null>;
    modifySupply: (
        supplyId: string,
        datas: Partial<
            Pick<SupplyType, 'name' | 'imagePath'> & {
                availability: string;
            }
        >
    ) => Promise<SupplyType | null | UpdateResult>;
};

export type { SupplyRepositoryInterface };
