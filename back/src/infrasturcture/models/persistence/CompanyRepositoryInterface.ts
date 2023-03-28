import { CompanyType } from '../company';

type CompanyRepositoryInterface = {
    getCompany: (companyId: string) => Promise<CompanyType | null>;
};

export type { CompanyRepositoryInterface };
