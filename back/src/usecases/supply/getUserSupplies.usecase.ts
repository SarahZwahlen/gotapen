import { SupplyType } from '../../infrasturcture/models/supply';
import { UserType } from '../../infrasturcture/models/user';

// est-ce que la personne qui regarde est le user ou est admin ?
const getUserSupplies = async (
    // sessionUserId: string,
    userId: string,
    getUser: (userId: string) => Promise<UserType | null>,
    getSupplies: (userId: string) => Promise<SupplyType[]>
): Promise<SupplyType[] | null> => {
    const isExisting = await getUser(userId);
    if (isExisting) {
        // if (
        //     isExisting.id === sessionUserId ||
        //     isExisting.roles.includes('admin')
        // ) {
        const supplies = await getSupplies(userId);
        if (supplies) {
            return supplies;
        } else {
            return null;
        }
        // } else {
        //     throw new Error('Unauthorized');
        // }w
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { getUserSupplies };
