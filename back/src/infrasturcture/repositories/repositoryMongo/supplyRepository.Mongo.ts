import Supply, { SupplyType } from '../../models/supply';
import fs from 'fs';
import { SupplyRepositoryInterface } from '../../models/persistence/SupplyRepositoryInterface';
import { filePath } from '../../../utils/filespaths.utils';

const supplyRepositoryMongo: SupplyRepositoryInterface = {
    addSupply: async (supplyName, owner, company, imagePath) => {
        const newSupply = new Supply({
            name: supplyName,
            owner: owner,
            company: company,
            imagePath: filePath(imagePath)
        });
        await newSupply.save();
        return newSupply;
    },
    deleteSupplyAndAllItsRef: async (supplyId: string): Promise<boolean> => {
        const supplyToDelete = await Supply.findById(supplyId);

        if (!supplyToDelete) {
            return false;
        }
        await Supply.deleteOne({ _id: supplyId });

        fs.unlink(`public/${supplyToDelete.imagePath}`, () =>
            console.log('pic deleted')
        );

        return true;
    },
    getSupply: async (supplyId: string): Promise<SupplyType | null> => {
        const supply = await Supply.findById(supplyId).populate('owner');
        return supply;
    },
    getSupplies: async (userId: string): Promise<SupplyType[]> => {
        const supplies = await Supply.find({ owner: userId });
        return supplies;
    },
    getAllCompynySupplies: async (companyId: string): Promise<SupplyType[]> => {
        const supplies = await Supply.find({ company: companyId });
        return supplies;
    },
    getCompanyAvailableSupplies: async (company, userId) => {
        const allSupplies = await Supply.find({
            company: company.id,
            availability: true
        }).populate('owner');
        const result: SupplyType[] = [];
        allSupplies.forEach((supply) => {
            if (supply.owner.id !== userId) {
                result.push(supply);
            }
        });
        return result;
    }
};

export { supplyRepositoryMongo };
