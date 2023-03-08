import { User } from '../models/user';

type UserRepositoryInterface = {
    getUser: (userId: string) => Promise<User | null>;
};

export type { UserRepositoryInterface };
