import { CompanyType } from '../models/company';
import Supply, { SupplyType } from '../models/supply';
import User, { UserType } from '../models/user';

const supplyRepository = {
    addSupply: async (
        owner: UserType,
        supplyDatas: Pick<SupplyType, 'name'>,
        fileName: string
    ) => {
        const newSupply = new Supply({
            ...supplyDatas,
            owner: owner,
            imagePath: `suppliesImages/${fileName}`
        });

        await newSupply.save();
        await User.updateOne(
            { _id: owner },
            { $push: { supplies: newSupply } }
        );
    },
    showUserAvailableSupplies: (company: CompanyType) => {
        let allSupplies: object[] = [];
        company.employees.map(async (employee) => {
            const newEmployee = await User.findById(employee);

            if (newEmployee) {
                const availableSupplies: object[] = [];
                newEmployee.supplies.forEach(async (supply) => {
                    const theSupply = await Supply.findById(supply);

                    if (theSupply?.availability === true) {
                        availableSupplies.push(theSupply);
                    }
                });

                allSupplies = [
                    ...allSupplies,
                    {
                        employee: newEmployee,
                        supplies: availableSupplies
                    }
                ];
            }
        });
        return allSupplies;
    }
};

export default supplyRepository;
