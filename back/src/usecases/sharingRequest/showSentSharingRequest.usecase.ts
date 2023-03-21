import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { UserType } from '../../infrasturcture/models/user';

const showSentSharingReq = async (
    userId: string,
    getUser: (userId: string) => Promise<UserType | null>,
    showSentSR: (userId: string) => Promise<SharingRequestType[] | null>
): Promise<SharingRequestType[] | null> => {
    const user = await getUser(userId);
    if (user) {
        const requests = await showSentSR(userId);
        if (requests) {
            return requests;
        } else {
            return null;
        }
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { showSentSharingReq };
