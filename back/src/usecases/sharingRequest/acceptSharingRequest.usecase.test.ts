import {
    buildSharinRequest,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { SupplyType } from '../../infrasturcture/models/supply';
import { UserType } from '../../infrasturcture/models/user';
import { acceptSharingRequest } from './acceptSharingRequest.usecase';

describe('Accept a sharing request', () => {
    test('Happy path', async () => {
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });

        const supply = await buildSupply({ availability: true });

        const sharingRequest = await buildSharinRequest({
            sharer: owner,
            applicant: applicant,
            sharedSupply: supply
        });
        owner.receivedSharingRequests = [sharingRequest];
        applicant.sentSharingRequests = [sharingRequest];

        let sharingRequestDB: SharingRequestType[] = [sharingRequest];
        const supplyDB: SupplyType[] = [supply];
        const userDB: UserType[] = [owner, applicant];

        const getUser = async (userId: string): Promise<UserType | null> => {
            const result = userDB.find((user) => user.id === userId);

            if (result) {
                return result;
            } else {
                return null;
            }
        };

        const getSupply = async (
            supplyId: string
        ): Promise<SupplyType | null> => {
            const result = supplyDB.find((supply) => supply.id === supplyId);
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const getSharingRequest = async (
            sharingRequestId: string
        ): Promise<SharingRequestType | null> => {
            const result = sharingRequestDB.find(
                (sharingRequest) => sharingRequest.id === sharingRequestId
            );
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const acceptSharing = async (
            sharingRequest: SharingRequestType
        ): Promise<void> => {
            sharingRequest.sharedSupply.availability = false;
            sharingRequest.applicant.sentSharingRequests = [];
            sharingRequest.sharer.receivedSharingRequests = [];
            sharingRequestDB = [];
        };

        await acceptSharingRequest(
            sharingRequest.id,
            getSharingRequest,
            getUser,
            getSupply,
            acceptSharing
        );

        expect(sharingRequestDB).not.toContain(sharingRequest);
        expect(applicant.sentSharingRequests).not.toContain(sharingRequest);
        expect(owner.receivedSharingRequests).not.toContain(sharingRequest);
        expect(supply.availability).toBeFalsy();
    });

    test("Supply doesn't exists in database", async () => {
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });

        const supply = await buildSupply({ availability: true });

        const sharingRequest = await buildSharinRequest({
            sharer: owner,
            applicant: applicant,
            sharedSupply: supply
        });
        owner.receivedSharingRequests = [sharingRequest];
        applicant.sentSharingRequests = [sharingRequest];

        let sharingRequestDB: SharingRequestType[] = [sharingRequest];
        const supplyDB: SupplyType[] = [];
        const userDB: UserType[] = [owner, applicant];

        const getUser = async (userId: string): Promise<UserType | null> => {
            const result = userDB.find((user) => user.id === userId);

            if (result) {
                return result;
            } else {
                return null;
            }
        };

        const getSupply = async (
            supplyId: string
        ): Promise<SupplyType | null> => {
            const result = supplyDB.find((supply) => supply.id === supplyId);
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const getSharingRequest = async (
            sharingRequestId: string
        ): Promise<SharingRequestType | null> => {
            const result = sharingRequestDB.find(
                (sharingRequest) => sharingRequest.id === sharingRequestId
            );
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const acceptSharing = async (
            sharingRequest: SharingRequestType
        ): Promise<void> => {
            sharingRequest.sharedSupply.availability = false;
            sharingRequest.applicant.sentSharingRequests = [];
            sharingRequest.sharer.receivedSharingRequests = [];
            sharingRequestDB = [];
        };

        await expect(
            async () =>
                await acceptSharingRequest(
                    sharingRequest.id,
                    getSharingRequest,
                    getUser,
                    getSupply,
                    acceptSharing
                )
        ).rejects.toThrow(
            "Something doesn't exists, it could be the owner, the applicant or the asked supply."
        );
    });

    test("Request doesn't exists in database", async () => {
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });

        const supply = await buildSupply({ availability: true });

        const sharingRequest = await buildSharinRequest({
            sharer: owner,
            applicant: applicant,
            sharedSupply: supply
        });
        owner.receivedSharingRequests = [sharingRequest];
        applicant.sentSharingRequests = [sharingRequest];

        let sharingRequestDB: SharingRequestType[] = [];
        const supplyDB: SupplyType[] = [supply];
        const userDB: UserType[] = [owner, applicant];

        const getUser = async (userId: string): Promise<UserType | null> => {
            const result = userDB.find((user) => user.id === userId);

            if (result) {
                return result;
            } else {
                return null;
            }
        };

        const getSupply = async (
            supplyId: string
        ): Promise<SupplyType | null> => {
            const result = supplyDB.find((supply) => supply.id === supplyId);
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const getSharingRequest = async (
            sharingRequestId: string
        ): Promise<SharingRequestType | null> => {
            const result = sharingRequestDB.find(
                (sharingRequest) => sharingRequest.id === sharingRequestId
            );
            if (!result) {
                return null;
            } else {
                return result;
            }
        };

        const acceptSharing = async (
            sharingRequest: SharingRequestType
        ): Promise<void> => {
            sharingRequest.sharedSupply.availability = false;
            sharingRequest.applicant.sentSharingRequests = [];
            sharingRequest.sharer.receivedSharingRequests = [];
            sharingRequestDB = [];
        };

        await expect(
            async () =>
                await acceptSharingRequest(
                    sharingRequest.id,
                    getSharingRequest,
                    getUser,
                    getSupply,
                    acceptSharing
                )
        ).rejects.toThrow("This sharing request doesn't exists");
    });
});
