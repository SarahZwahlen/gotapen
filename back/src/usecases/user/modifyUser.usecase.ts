import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { UserType } from '../../infrasturcture/models/user';

const modifyUser = async (
    userId: string,
    datas: Partial<
        Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>
    >,
    userRepo: UserRepositoryInterface
) => {
    const user = await userRepo.getUserById(userId);
    if (user) {
        await userRepo.updateUser(userId, datas);
        return await userRepo.getUserById(userId);
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { modifyUser };
