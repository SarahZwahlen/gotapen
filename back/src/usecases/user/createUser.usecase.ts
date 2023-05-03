import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { UserType } from '../../infrasturcture/models/user';
import { emailValidator } from '../../utils/emailValidator';

const createUser = async (
    datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
        companyCode: string;
        companyName: string;
    },
    userRepo: UserRepositoryInterface,
    companyRepo: CompanyRepositoryInterface
): Promise<UserType> => {
    //validate company code exists in database
    const company = await companyRepo.getCompanyByName(datas.companyName);
    if (!company) {
        throw new Error('This company name is not valid');
    }

    const isCompanyAuthentified = await companyRepo.verifyCompanyJoinCode(
        company.id,
        datas.companyCode
    );

    if (!isCompanyAuthentified) {
        throw new Error('Authentification to company failed');
    }
    if (!emailValidator(datas.email)) {
        throw new Error('This email is not valid');
    }

    const existingEmail = await userRepo.getUserByEmail(datas.email);

    if (existingEmail) {
        throw new Error('This email is already used by an other user');
    }

    const userDatas: Partial<UserType> & { companyId: string } = {
        email: datas.email,
        firstname: datas.firstname,
        password: datas.password,
        surname: datas.surname,
        companyId: company.id
    };

    const newUser = await userRepo.saveUser(userDatas);
    await companyRepo.addEmployee(newUser.id, company.id);

    return newUser;
};

export { createUser };
