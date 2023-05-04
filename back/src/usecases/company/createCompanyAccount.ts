import { CompanyRepositoryInterface } from '../../infrasturcture/models/persistence/CompanyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { UserType } from '../../infrasturcture/models/user';
import { emailValidator } from '../../utils/emailValidator';

const CreateCompanyAccount = async (
    datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
        joinCode: string;
        companyName: string;
    },
    userRepo: UserRepositoryInterface,
    companyRepo: CompanyRepositoryInterface
) => {
    const companyExists = await companyRepo.getCompanyByName(datas.companyName);
    if (companyExists) {
        throw new Error('This company name already exists');
    }

    const company = await companyRepo.createCompany(
        datas.companyName,
        datas.joinCode
    );

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
        companyId: company.id,
        roles: ['admin', 'user']
    };

    const newUser = await userRepo.saveUser(userDatas);
    await companyRepo.addEmployee(newUser.id, company.id);

    return newUser;
};

export { CreateCompanyAccount };
