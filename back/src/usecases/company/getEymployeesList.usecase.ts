import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';

const getEmployeesList = async (
    companyRepo: CompanyRepositoryInterface,
    companyId: string
) => {
    return await companyRepo.getEmployees(companyId);
};

export default getEmployeesList;
