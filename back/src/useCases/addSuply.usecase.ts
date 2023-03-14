import { SupplyType } from '../models/supply';
import { UserType } from '../models/user';

const addSupply = async (
    name: string,
    owner: UserType,
    filename: string,
    saveSupply: (
        email: string,
        owner: UserType,
        filename: string
    ) => Promise<SupplyType>,
    getUserByEmail: (ownerEmail: string) => Promise<UserType>
): Promise<SupplyType> => {
    const existingUser = await getUserByEmail(owner.email);
    if (!existingUser) {
        throw new Error("This user doesn't exists");
    }
    const newSupply = await saveSupply(name, owner, filename);
    // Ajouter le supply au user      

    return newSupply;
};

export { addSupply };
