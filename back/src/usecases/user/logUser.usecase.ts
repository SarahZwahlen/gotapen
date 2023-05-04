import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { UserType } from '../../infrasturcture/models/user';

const logUser = async (
    email: string,
    password: string,
    userRepo: UserRepositoryInterface
): Promise<UserType> => {
    const user = await userRepo.logUser(email, password);

    if (!user) {
        throw new Error('Wrong password');
    }

    return user;
};

export { logUser };
