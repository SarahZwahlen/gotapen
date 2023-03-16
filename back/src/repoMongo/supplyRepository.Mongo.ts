import Supply, { SupplyType } from '../models/supply';
import { UserType } from '../models/user';
import fs from 'fs';

const supplyRepositoryMongo = {
    addSupply: async (datas: {
        name: string;
        owner: UserType;
        fileName: string;
    }) => {
        const newSupply = new Supply({
            ...datas,
            imagePath: `public/images/${datas.fileName}`
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
        const supply = await Supply.findById(supplyId);
        return supply;
    },
    getAllCompynySupplies: async (companyId: string): Promise<SupplyType[]> => {
        const supplies = await Supply.find({ company: companyId });
        return supplies;
    }
};

export { supplyRepositoryMongo };
