import { CompanyType } from '../../models/company';
import { CompanyRepositoryInterface } from '../../models/persistence/CompanyRepositoryInterface';
import bcrypt from 'bcrypt';
import { userRepoInMemory } from './user.resposotory.InMemory';
import { buildCompany } from '../../builders/builders.test.utils';
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
    },
    getEmployees: async function (companyId: string) {
        const company = await this.getCompany(companyId);
        if (company) {
            return company.employees;
        } else {
            return null;
        }
    },
    getCompanyByName: async function (companyName: string) {
        const company = this.companies.find(
            (company) => company.name === companyName
        );
        if (company) {
            return Promise.resolve(company);
        } else {
            return Promise.resolve(null);
        }
    },
    verifyCompanyJoinCode: async function (companyId, companyJoinCode) {
        const company = await this.getCompany(companyId);
        return await bcrypt.compare(companyJoinCode, company!.joinCode);
    },
    addEmployee: async function (employeeId, companyId) {
        const company = await this.getCompany(companyId);
        const user = await userRepoInMemory.getUserById(employeeId);
        company!.employees.push(user!);
    },
    createCompany: async function (companyName, joinCode) {
        const company = await buildCompany({
            name: companyName,
            joinCode: joinCode
        });
        this.companies.push(company);

        return company;
    }
};

export { companyRepoInMemory };
