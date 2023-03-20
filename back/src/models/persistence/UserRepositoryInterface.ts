import { UserType } from '../user';

type UserRepositoryInterface = {
    getUser: (userId: string) => Promise<UserType>;
};

export type { UserRepositoryInterface };
