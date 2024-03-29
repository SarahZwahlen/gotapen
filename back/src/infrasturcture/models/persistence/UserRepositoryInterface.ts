import { SupplyType } from '../supply';
import { UserType } from '../user';

type UserRepositoryInterface = {
    saveUser: (
        datas: Partial<UserType> & { companyId: string }
    ) => Promise<UserType>;
    updateUser: (
        userId: string,
        datas: Partial<
            Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>
        >
    ) => Promise<UserType | null>;
    getUserByEmail: (email: string) => Promise<UserType | null>;
    getUserById: (userId: string) => Promise<UserType | null>;
    deleteUser: (userId: string) => Promise<void>;
    getBorrowedSupplies: (userId: string) => Promise<SupplyType[] | null>;
    logUser: (email: string, password: string) => Promise<UserType | null>;
};

export type { UserRepositoryInterface };
