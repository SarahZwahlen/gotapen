import {
    buildUser,
    buildSupply,
    buildSharinRequest
} from '../../infrasturcture/builders/builders.test.utils';
import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { supplyRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/supply.respository.inMemory';
import { userRepoInMemory } from '../../infrasturcture/repositories/repositoryInMemory/user.resposotory.InMemory';
import { sendSharingRequestUseCase } from './sendSharingRequest.usecase';

describe('Send a sharing request', () => {
    beforeEach(() => {
        supplyRepoInMemory.reset();
        userRepoInMemory.reset();
    });
    test('Happy path', async () => {
        // Given an owner
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });

        // Given an applicant
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });
        // Given a supply
        const supply = await buildSupply({ availability: true, owner: owner });
        const sharingRequestDB: SharingRequestType[] = [];
        // Everything exists on database
        userRepoInMemory.givenExistingUser(owner);
        userRepoInMemory.givenExistingUser(applicant);
        supplyRepoInMemory.givenExistingSupply(supply);
        // Given a sharing request
        const sharingRequest = await buildSharinRequest({
            applicant: applicant,
            sharer: owner,
            sharedSupply: supply
        });
        const sendSharingRq = async (
            ownerId: string,
            applicantId: string
            // supplyId: string
        ) => {
            const theOwner = await userRepoInMemory.getUserById(ownerId);
            const theApplicant = await userRepoInMemory.getUserById(
                applicantId
            );
            // const theSupply = await supplyRepoInMemory.getSupply(supplyId);
            if (!theOwner || !theApplicant) {
                throw new Error("User doesn't exists");
            }
            // if (!theSupply) {
            //     throw new Error("Supply doesn't exists");
            // }
            theOwner.receivedSharingRequests = [sharingRequest];
            theApplicant.sentSharingRequests = [sharingRequest];

            sharingRequestDB.push(sharingRequest);
        };

        await sendSharingRequestUseCase(
            applicant.id,
            supply.id,
            userRepoInMemory,
            supplyRepoInMemory,
            sendSharingRq
        );

        expect(sharingRequestDB).toContain(sharingRequest);
        expect(owner.receivedSharingRequests).toContain(sharingRequest);
        expect(applicant.sentSharingRequests).toContain(sharingRequest);
    });

    test("Supply doesn't exists", async () => {
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });

        const supply = await buildSupply({ availability: true, owner: owner });
        const sharingRequestDB: SharingRequestType[] = [];

        userRepoInMemory.givenExistingUser(owner);
        userRepoInMemory.givenExistingUser(applicant);

        const sharingRequest = await buildSharinRequest({
            applicant: applicant,
            sharer: owner,
            sharedSupply: supply
        });
        const sendSharingRq = async (ownerId: string, applicantId: string) => {
            owner.receivedSharingRequests = [sharingRequest];
            applicant.sentSharingRequests = [sharingRequest];
            sharingRequestDB.push(sharingRequest);
        };

        await expect(
            async () =>
                await sendSharingRequestUseCase(
                    // owner.id,
                    applicant.id,
                    supply.id,
                    userRepoInMemory,
                    supplyRepoInMemory,
                    sendSharingRq
                )
        ).rejects.toThrow("This supply doesn't exists");
    });

    test("Owner or applicant doesn't exists", async () => {
        const owner = await buildUser({
            email: 'owner@mail.com',
            firstname: 'owner'
        });
        const applicant = await buildUser({
            email: 'applicant@mail.com',
            firstname: 'applicant'
        });

        const supply = await buildSupply({
            availability: true,
            owner: owner
        });
        const sharingRequestDB: SharingRequestType[] = [];
        supplyRepoInMemory.givenExistingSupply(supply);

        const sharingRequest = await buildSharinRequest({
            applicant: applicant,
            sharer: owner,
            sharedSupply: supply
        });
        const sendSharingRq = async (ownerId: string, applicantId: string) => {
            owner.receivedSharingRequests = [sharingRequest];
            applicant.sentSharingRequests = [sharingRequest];
            sharingRequestDB.push(sharingRequest);
        };

        await expect(
            async () =>
                await sendSharingRequestUseCase(
                    applicant.id,
                    supply.id,
                    userRepoInMemory,
                    supplyRepoInMemory,
                    sendSharingRq
                )
        ).rejects.toThrow("Owner or applicant doesn't exist");
    });
});
