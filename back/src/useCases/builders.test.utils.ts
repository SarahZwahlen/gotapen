import { UserType } from '../models/user';
import bcrypt from 'bcrypt';
import { CompanyType } from '../models/company';
import { SupplyType } from '../models/supply';
import { randomUUID } from 'crypto';

const buildUser = async (params: Partial<UserType> = {}): Promise<UserType> => {
    const user = {
        id: randomUUID(),
        email: 'sarah@mail.fr',
        password: '123',
        surname: 'Zwn',
        firstname: 'Sarah',
        roles: ['user'],
        borrowedSupplies: [],
        sentSharingRequests: [],
        company: await buildCompany(),
        receivedSharingRequests: [],
        ...params
    };
    user.password = await bcrypt.hash(user.password, 10);

    return user;
};

const buildCompany = async (
    params: Partial<CompanyType> = {}
): Promise<CompanyType> => {
    const company = {
        employees: [],
        name: 'Totoland',
        joinCode: '123',
        ...params
    };

    company.joinCode = await bcrypt.hash(company.joinCode, 10);

    return company;
};

const buildSupply = async (
    params: Partial<SupplyType> = {}
): Promise<SupplyType> => {
    return {
        id: randomUUID(),
        availability: true,
        company: await buildCompany(),
        imagePath: 'Image.jpg',
        name: 'Stylo',
        owner: await buildUser(),
        ...params
    };
};

export { buildUser, buildCompany, buildSupply };
