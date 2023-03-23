import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { SupplyType } from '../../infrasturcture/models/supply';

const acceptSharingRequest = async (
    sharingRequestId: string,
    getSharingRequest: (
        sharingRequestId: string
    ) => Promise<SharingRequestType | null>,
    getUser: UserRepositoryInterface['getUserById'],
    getSupply: (supplyId: string) => Promise<SupplyType | null>,
    acceptSharing: (sharingRequest: SharingRequestType) => Promise<void>
) => {
    const sharingRequest = await getSharingRequest(sharingRequestId);
    // console.log('sharing request', sharingRequest);
    // console.log('applicant', sharingRequest?.applicant);
    // console.log('applicant', sharingRequest?.sharer);
    // console.log('applicant', sharingRequest?.sharedSupply);

    if (sharingRequest) {
        const owner = await getUser(sharingRequest.sharer.id);
        const applicant = await getUser(sharingRequest.applicant.id);
        const supply = await getSupply(sharingRequest.sharedSupply.id);

        if (owner && applicant && supply) {
            await acceptSharing(sharingRequest);
        } else {
            throw new Error(
                "Something doesn't exists, it could be the owner, the applicant or the asked supply."
            );
        }
    } else {
        throw new Error("This sharing request doesn't exists");
    }
};

export { acceptSharingRequest };
