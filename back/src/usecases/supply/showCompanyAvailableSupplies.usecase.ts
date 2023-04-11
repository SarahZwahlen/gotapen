import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';
import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';

const showCompanyAvailableSupplies = async (
    userId: string,
    userRepo: UserRepositoryInterface,
    companyRepo: CompanyRepositoryInterface,
    supplyRepo: SupplyRepositoryInterface
) => {
    const user = await userRepo.getUserById(userId);
    if (!user) {
        throw new Error("This user doesn't exists");
    }
    const companyId = user.company.id;
    const company = await companyRepo.getCompany(companyId);
    if (!company) {
        throw new Error("This company doesn't exists");
    }
    const supplies = await supplyRepo.getCompanyAvailableSupplies(
        company,
        user.id
    );
    return supplies;
};

export default showCompanyAvailableSupplies;
