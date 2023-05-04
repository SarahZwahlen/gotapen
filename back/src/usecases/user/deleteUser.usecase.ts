import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';

const deleteAccount = async (
    userId: string,
    userRepository: UserRepositoryInterface
): Promise<void> => {
    const user = await userRepository.getUserById(userId);
    if (user) {
        await userRepository.deleteUser(userId);
        return;
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { deleteAccount };
