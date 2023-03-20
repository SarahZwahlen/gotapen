import { UserType } from '../../infrasturcture/models/user';

const modifyUser = async (
    datas: Partial<UserType>,
    getUserbyId: (userId: string) => Promise<UserType | null>,
    updateUserDatas: (datas: Partial<UserType>) => Promise<void>
) => {
    if (
        datas.borrowedSupplies ||
        datas.company ||
        datas.receivedSharingRequests ||
        datas.roles ||
        datas.sentSharingRequests
    ) {
        throw new Error("You can't modify this datas");
    } else {
        if (!datas.id) {
            throw new Error('There is not user id');
        } else {
            const user = await getUserbyId(datas.id);
            if (user) {
                await updateUserDatas(datas);
                return await getUserbyId(datas.id);
            } else {
                throw new Error("This user doesn't exists");
            }
        }
    }
};

export { modifyUser };
