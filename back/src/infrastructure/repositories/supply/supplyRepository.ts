import { SupplyRepositoryInterface } from '../../../domain/repositories/supplyRepository.interface';
import Supply from '../../../models/supply';
import User from '../../../models/user';

const supplyRepository: SupplyRepositoryInterface = {
    addSupply: async (supply) => {
        const newSupply = new Supply({
            ...supply,
        });
        const createdSupply = await newSupply.save();
        await User.updateOne({ _id: supply.owner }, { supplies: newSupply });

        return createdSupply.toObject();
    },
};

export { supplyRepository };
