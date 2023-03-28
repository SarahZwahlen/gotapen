import { CompanyType } from '../../models/company';
import { CompanyRepositoryInterface } from '../../models/persistence/CompanyRepositoryInterface';

const companyRepoInMemory: CompanyRepositoryInterface & {
    companies: CompanyType[];
    reset: () => void;
    givenExistingCompany: (company: CompanyType) => void;
} = {
    companies: [],
    reset: function () {
        this.companies = [];
    },
    givenExistingCompany: function (company) {
        this.companies.push(company);
    },
    getCompany: function (companyId: string) {
        const result = this.companies.find(
            (company) => company.id === companyId
        );
        if (!result) {
            return Promise.resolve(null);
        }
        return Promise.resolve(result);
    }
};

export default companyRepoInMemory;
