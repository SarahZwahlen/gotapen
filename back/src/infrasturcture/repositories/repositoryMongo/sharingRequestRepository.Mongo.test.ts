import mongoose from 'mongoose';
import {
    clearDatabase,
    connectDBForTesting,
    disconnectDBForTesting
} from '../../../../tests/connectDBForTesting';
import SharingRequest from '../../models/sharingRequest';
import Supply from '../../models/supply';
import User from '../../models/user';
import { sharingRequestRepositoryMongo } from './sharingRequestRepository.Mongo';

describe('SharingRequestRepository', () => {
    afterEach(async () => await clearDatabase());
    beforeAll(async () => await connectDBForTesting());
    afterAll(async () => await disconnectDBForTesting());
    // todo: test builders
    describe('AcceptSharing', () => {
        describe('Nominal cases', () => {
            test('it accepts a sharing request', async () => {
                // Given I have a sharer
                const sharer = await User.create({
                    email: 'sharer@gmail.com',
                    firstname: 'Clark',
                    surname: 'Kent',
                    password: '1234'
                });
                // Given I have a supply to share
                const sharedSupply = await Supply.create({
                    name: 'pencil',
                    owner: sharer,
                    imagePath: 'toto.jpg'
                });
                // Given I have an applicant
                const existingApplicant = await User.create({
                    email: 'applicant@gmail.com',
                    firstname: 'Joe',
                    surname: 'Dalton',
                    password: '1234'
                });

                // Given I have a sharing request
                const existingSharingRequestParams = {
                    applicant: existingApplicant.id,
                    sharer: sharer.id,
                    sharedSupply: sharedSupply.id
                };

                const existingSharingRequest = await SharingRequest.create(
                    existingSharingRequestParams
                );
                // When I accept the sharing request
                const result =
                    await sharingRequestRepositoryMongo.acceptSharingRequest(
                        existingSharingRequest
                    );

                // Then the supply is not available anymore
                expect(
                    (await Supply.findById(sharedSupply.id))?.availability
                ).toBeFalsy();

                // And the sharing request is deleted
                expect(
                    await SharingRequest.findById(existingSharingRequest)
                ).toBeNull();
                // And the applicant does not have the request in its sent sharing requests
                const applicant = (await User.findById(existingApplicant.id))!;
                expect(applicant.sentSharingRequests).not.toEqual(
                    expect.arrayContaining([
                        new mongoose.Types.ObjectId(existingSharingRequest.id)
                    ])
                );
                // And the applicant now borrows the supply
                expect(applicant.borrowedSupplies).toEqual(
                    expect.arrayContaining([
                        new mongoose.Types.ObjectId(sharedSupply.id)
                    ])
                );
                // And the sharer does not have the request in its received sharing requests
                expect(
                    (await User.findById(sharer.id))?.receivedSharingRequests
                ).not.toEqual(
                    expect.arrayContaining([existingSharingRequest.id])
                );

                // And the result is empty
                expect(result).toBeUndefined();
            });

            test('Get sharing request', async () => {
                const sharer = await User.create({
                    email: 'sharer@gmail.com',
                    firstname: 'Clark',
                    surname: 'Kent',
                    password: '1234'
                });
                // Given I have a supply to share
                const sharedSupply = await Supply.create({
                    name: 'pencil',
                    owner: sharer.id,
                    imagePath: 'toto.jpg'
                });
                // Given I have an applicant
                const existingApplicant = await User.create({
                    email: 'applicant@gmail.com',
                    firstname: 'Joe',
                    surname: 'Dalton',
                    password: '1234'
                });

                // Given I have a sharing request
                const existingSharingRequestParams = {
                    applicant: existingApplicant.id,
                    sharer: sharer.id,
                    sharedSupply: sharedSupply.id
                };

                const existingSharingRequest = await SharingRequest.create(
                    existingSharingRequestParams
                );

                const result = await SharingRequest.findById(
                    existingSharingRequest.id
                ).populate(['applicant', 'sharer', 'sharedSupply']);

                expect(
                    await sharingRequestRepositoryMongo.getSharingRequest(
                        existingSharingRequest.id
                    )
                ).toEqual(result);
            });
        });
    });

    describe('Denied Sharing request', () => {
        test('User refused the sharing request', async () => {
            // Given I have a sharer
            const sharer = await User.create({
                email: 'sharer@gmail.com',
                firstname: 'Clark',
                surname: 'Kent',
                password: '1234'
            });
            // Given I have a supply to share
            const sharedSupply = await Supply.create({
                name: 'pencil',
                owner: sharer.id,
                imagePath: 'toto.jpg'
            });
            // Given I have an applicant
            const existingApplicant = await User.create({
                email: 'applicant@gmail.com',
                firstname: 'Joe',
                surname: 'Dalton',
                password: '1234'
            });

            // Given I have a sharing request
            const existingSharingRequestParams = {
                applicant: existingApplicant.id,
                sharer: sharer.id,
                sharedSupply: sharedSupply.id
            };

            const existingSharingRequest = await SharingRequest.create(
                existingSharingRequestParams
            );

            // When the sharing request is denied
            const result =
                await sharingRequestRepositoryMongo.deniedSharingRequest(
                    existingSharingRequest
                );

            // The sharing request is delete from DB
            const isRequestExiststing = await SharingRequest.findById(
                existingSharingRequest._id
            );
            expect(isRequestExiststing).toBe(null);

            // The sharing request is deleted from the sharer receivedSharingRequests
            expect(
                (await User.findById(sharer.id))?.receivedSharingRequests
            ).not.toEqual(expect.arrayContaining([existingSharingRequest.id]));

            // The sharing request is deleted from the applicant sentSharingRequests
            const applicant = (await User.findById(existingApplicant.id))!;
            expect(applicant.sentSharingRequests).not.toEqual(
                expect.arrayContaining([
                    new mongoose.Types.ObjectId(existingSharingRequest.id)
                ])
            );

            // And the result is empty
            expect(result).toBeUndefined();
        });
    });
});

// describe('Send sharing request', () => {
//     test('applicant send a sharing request', async () => {
//         // Given I have a sharer
//         const sharer = await User.create({
//             email: 'sharer@gmail.com',
//             firstname: 'Clark',
//             surname: 'Kent',
//             password: '1234'
//         });
//         // Given I have a supply to share
//         const sharedSupply = await Supply.create({
//             name: 'pencil',
//             owner: sharer.id
//         });
//         // Given I have an applicant
//         const applicant = await User.create({
//             email: 'applicant@gmail.com',
//             firstname: 'Joe',
//             surname: 'Dalton',
//             password: '1234'
//         });

//         // When I send a sharing request
//         const sharingRequest =
//             await sharingRequestRepositoryMongo.sendSharingRequest(
//                 sharer.id,
//                 applicant.id,
//                 sharedSupply.id
//             );
//         // The sharing request is created
//         if (sharingRequest) {
//             expect(
//                 await SharingRequest.findById(sharingRequest.id)
//             ).not.toBe(null);
//             // Applicant has its request in its sentSharingRequests
//             expect(
//                 (await User.findById(applicant.id))?.sentSharingRequests
//             ).toEqual(expect.arrayContaining([sharingRequest.id]));
//             // Sharer has its request in its receivedSharingRequests
//             expect(
//                 (await User.findById(sharer.id))?.receivedSharingRequests
//             ).toEqual(expect.arrayContaining([sharingRequest.id]));
//         }
//     });
// });
