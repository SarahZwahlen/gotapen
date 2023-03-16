import { CompanyType } from '../models/company';
import Supply from '../models/supply';

const supplyRepository = {
    // addSupply: async (
    //     owner: UserType,
    //     supplyDatas: Pick<SupplyType, 'name'>,
    //     fileName: string
    // ) => {
    //     const newSupply = new Supply({
    //         ...supplyDatas,
    //         owner: owner,
    //         imagePath: `suppliesImages/${fileName}`
    //     });

    //     await newSupply.save();
    //     await User.updateOne(
    //         { _id: owner },
    //         { $push: { supplies: newSupply } }
    //     );
    // },
    showUserAvailableSupplies: async (company: CompanyType) => {
        const allSupplies = await Supply.find({
            company: company,
            availability: true
        });

        return allSupplies;
    }
};

export default supplyRepository;
