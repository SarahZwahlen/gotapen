import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { UserType } from '../../infrasturcture/models/user';

const showReceivedSharingReq = async (
    userId: string,
    getUser: (userId: string) => Promise<UserType | null>,
    showReceivedSR: (userId: string) => Promise<SharingRequestType[] | null>
): Promise<SharingRequestType[] | null> => {
    const user = await getUser(userId);
    if (user) {
        const requests = await showReceivedSR(userId);
        if (requests) {
            return requests;
        } else {
            return null;
        }
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { showReceivedSharingReq };
