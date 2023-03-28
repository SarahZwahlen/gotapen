import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';
import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { SupplyType } from '../../infrasturcture/models/supply';

const createNewSupply = async (
    userId: string,
    datas: Pick<SupplyType, 'name' | 'imagePath'>,
    userRepo: UserRepositoryInterface,
    companyRepo: CompanyRepositoryInterface,
    supplyRepo: SupplyRepositoryInterface
): Promise<SupplyType> => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error("This user doesn't exists");
    }
    const company = await companyRepo.getCompany(user.company.id);
    if (!company) {
        throw new Error("This company doesn't exists");
    }
    const newSupply = await supplyRepo.addSupply(
        datas.name,
        user,
        company,
        datas.imagePath
    );

    return newSupply;
};

export { createNewSupply };
