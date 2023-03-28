import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { SupplyType } from '../../infrasturcture/models/supply';

const ShowBorrowedSupplies = async (
    userId: string,
    userRepo: UserRepositoryInterface
): Promise<SupplyType[] | null> => {
    const supplies = await userRepo.getBorrowedSupplies(userId);
    if (supplies?.length !== 0) {
        return supplies;
    } else {
        return null;
    }
};

export default ShowBorrowedSupplies;
