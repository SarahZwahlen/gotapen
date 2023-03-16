import { UserType } from '../../models/user';

const deleteAccount = async (
    userId: string,
    getUser: (userId: string) => Promise<UserType | null>,
    deleteUser: (userId: string) => Promise<void>
): Promise<void> => {
    const user = await getUser(userId);
    if (user) {
        await deleteUser(userId);
        return;
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { deleteAccount };
