import { UserType } from '../../infrasturcture/models/user';

const getUserDatas = async (
    userId: string,
    getUser: (userId: string) => Promise<UserType | null>
): Promise<UserType> => {
    const user = await getUser(userId);

    if (user) {
        return user;
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { getUserDatas };
