import {
    buildSharinRequest,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { UserType } from '../../infrasturcture/models/user';
import { showReceivedSharingReq as showSentSharingReq } from './showRecivedSharingRequest.usecase';

describe('Show sent sharing requests', () => {
    test('Happy path', async () => {
        // given a user
        const user = await buildUser();
        // givent a applicant
        const applicant = await buildUser({ email: 'applicant@mail.com' });
        // given a supply
        const supply = await buildSupply();
        // given a sharing request
        const sharingRequest = await buildSharinRequest({
            applicant: applicant,
            sharedSupply: supply,
            sharer: user
        });
        // given a sharing request DB
        const sharingRequestDB: SharingRequestType[] = [sharingRequest];
        user.receivedSharingRequests = [sharingRequest];
        applicant.sentSharingRequests = [sharingRequest];
        // given a user DB
        const userDB: UserType[] = [user, applicant];

        const getUser = async (userId: string): Promise<UserType | null> => {
            const user = userDB.find((user) => user.id === userId);
            if (user) {
                return user;
            } else {
                return null;
            }
        };

        const showSentSR = async (
            userId: string
        ): Promise<SharingRequestType[] | null> => {
            const user = userDB.find((user) => user.id === userId);
            if (user) {
                return user.receivedSharingRequests;
            } else {
                return null;
            }
        };

        expect(await showSentSharingReq(user.id, getUser, showSentSR)).toEqual(
            user.receivedSharingRequests
        );
    });

    test("User dosen't exists", async () => {
        // given a user
        const user = await buildUser();
        // givent a applicant
        const applicant = await buildUser({ email: 'applicant@mail.com' });
        // given a supply
        const supply = await buildSupply();
        // given a sharing request
        const sharingRequest = await buildSharinRequest({
            applicant: applicant,
            sharedSupply: supply,
            sharer: user
        });
        // given a sharing request DB
        const sharingRequestDB: SharingRequestType[] = [sharingRequest];
        user.receivedSharingRequests = [sharingRequest];
        applicant.sentSharingRequests = [sharingRequest];
        // given a user DB
        const userDB: UserType[] = [applicant];

        const getUser = async (userId: string): Promise<UserType | null> => {
            const user = userDB.find((user) => user.id === userId);
            if (user) {
                return user;
            } else {
                return null;
            }
        };

        const showSentSR = async (
            userId: string
        ): Promise<SharingRequestType[] | null> => {
            const user = userDB.find((user) => user.id === userId);
            if (user) {
                return user.receivedSharingRequests;
            } else {
                return null;
            }
        };

        await expect(async () =>
            showSentSharingReq(user.id, getUser, showSentSR)
        ).rejects.toThrow("This user doesn't exist");
    });
});
