import { SupplyType } from '../../models/supply';
import { UserType } from '../../models/user';

const createNewSupply = async (
    datas: {
        name: string;
        owner: UserType;
        fileName: string;
    },
    saveSupply: (datas: {
        name: string;
        owner: UserType;
        fileName: string;
    }) => Promise<SupplyType>,
    getUserById: (ownerId: string) => Promise<UserType | null>
): Promise<SupplyType> => {
    const existingUser = await getUserById(datas.owner.email);
    if (!existingUser) {
        throw new Error("This user doesn't exists");
    }

    const newSupply = await saveSupply(datas);

    return newSupply;
};

export { createNewSupply };
