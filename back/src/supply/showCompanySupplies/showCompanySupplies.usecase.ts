import { CompanyType } from '../../models/company';
import { SupplyType } from '../../models/supply';

const getAllCompanySupplies = async (
    companyId: string,
    userId: string,
    getCompany: (companyId: string) => Promise<CompanyType | null>,
    getUserCompany: (
        companyId: string,
        userId: string
    ) => Promise<CompanyType | null>,
    getSupplies: (companyId: string) => Promise<SupplyType[]>
) => {
    const company = await getCompany(companyId);
    const otherCompany = await getUserCompany(companyId, userId);
    if (company && otherCompany) {
        if (company.id && otherCompany.id) {
            if (company.id === otherCompany.id) {
                const supplies = await getSupplies(companyId);
                return supplies;
            } else {
                throw new Error('This user is not part of the company');
            }
        }
    } else {
        throw new Error("This company doesn't exists");
    }
};

export { getAllCompanySupplies };
