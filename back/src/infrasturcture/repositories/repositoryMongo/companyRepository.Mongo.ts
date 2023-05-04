import Company, { CompanyType } from '../../models/company';
import { CompanyRepositoryInterface } from '../../models/persistence/CompanyRepositoryInterface';
import bcrypt from 'bcrypt';
const companyRepositoryMongo: CompanyRepositoryInterface = {
    getCompany: async (companyId: string): Promise<CompanyType | null> => {
        const company = await Company.findById(companyId);
        return company;
    },
    getEmployees: async (companyId) => {
        const result: CompanyType | null = await Company.findById(
            companyId
        ).populate('employees');
        const employees = result?.employees;
        if (employees) {
            return employees;
        } else {
            return null;
        }
    },
    getCompanyByName: async (companyName) => {
        return await Company.findOne({ name: companyName });
    },
    verifyCompanyJoinCode: async function (companyId, joinCode) {
        const company = await this.getCompany(companyId);
        const authentValidation = await bcrypt.compare(
            joinCode,
            company!.joinCode
        );

        return authentValidation;
    },
    addEmployee: async (employeeId, companyId) => {
        await Company.updateOne(
            { _id: companyId },
            { $push: { employees: employeeId } }
        );
    },
    createCompany: async (companyName, joinCode) => {
        const newCompany = await Company.create({
            name: companyName,
            joinCode: await bcrypt.hash(joinCode, 10)
        });
        newCompany.save();

        return newCompany;
    }
};

export { companyRepositoryMongo };
