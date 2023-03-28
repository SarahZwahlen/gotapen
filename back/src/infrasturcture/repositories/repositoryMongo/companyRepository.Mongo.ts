import Company, { CompanyType } from '../../models/company';
import User from '../../models/user';

const companyRepositoryMongo = {
    getCompany: async (companyId: string): Promise<CompanyType | null> => {
        const company = await Company.findById(companyId);
        return company;
    },
    getCompanyByUser: async (
        companyId: string,
        userId: string
    ): Promise<CompanyType | null> => {
        const companyDatas = await User.findById(userId).populate('company');
        if (companyDatas) {
            const company = await Company.findById(companyDatas.id);
            return company;
        } else {
            return null;
        }
    }
};

export { companyRepositoryMongo };
