import { UserType } from '../user';

type UserRepositoryInterface = {
    saveUser : (datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
    }) => Promise<UserType>,
    updateUser: (datas:Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>),
    getUserByEmail : (email: string) => Promise<UserType | null>,
    getUserById: (userId : string) => Promise<UserType | null>,
    deleteUser: (userId : string) => Promise<void>,

};

export type { UserRepositoryInterface };
