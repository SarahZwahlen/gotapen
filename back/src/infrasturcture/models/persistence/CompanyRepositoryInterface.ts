import { CompanyType } from '../company';
import { UserType } from '../user';

type CompanyRepositoryInterface = {
    getCompany: (companyId: string) => Promise<CompanyType | null>;
    getEmployees: (companyId: string) => Promise<UserType[] | null>;
    verifyCompanyJoinCode: (
        companyId: string,
        companyCode: string
    ) => Promise<boolean>;
    getCompanyByName: (companyName: string) => Promise<CompanyType | null>;
    addEmployee: (employeeId: string, companyId: string) => Promise<void>;
};

export type { CompanyRepositoryInterface };
