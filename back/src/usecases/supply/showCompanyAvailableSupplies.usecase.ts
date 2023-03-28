import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';
import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';

const showCompanyAvailableSupplies = async (
    companyId: any,
    companyRepo: CompanyRepositoryInterface,
    supplyRepo: SupplyRepositoryInterface
) => {
    console.log(companyId);
    const company = await companyRepo.getCompany(companyId);
    if (!company) {
        throw new Error("This company doesn't exists");
    }

    const supplies = await supplyRepo.getCompanyAvailableSupplies(company);

    return supplies;
};

export default showCompanyAvailableSupplies;
