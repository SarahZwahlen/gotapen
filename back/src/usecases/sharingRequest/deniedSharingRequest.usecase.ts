import { SharingRequestType } from '../../infrasturcture/models/sharingRequest';
import { SupplyType } from '../../infrasturcture/models/supply';
import { UserType } from '../../infrasturcture/models/user';

const deniedSharingRequest = async (
    sharingRequestId: string,
    getSharingRequest: (
        sharingRequestId: string
    ) => Promise<SharingRequestType | null>,
    getUser: (userId: string) => Promise<UserType | null>,
    getSupply: (supplyId: string) => Promise<SupplyType | null>,
    deniedSharing: (sharingRequest: SharingRequestType) => Promise<void>
) => {
    const sharingRequest = await getSharingRequest(sharingRequestId);

    if (sharingRequest) {
        const owner = await getUser(sharingRequest.sharer.id);
        const applicant = await getUser(sharingRequest.applicant.id);
        const supply = await getSupply(sharingRequest.sharedSupply.id);

        if (owner && applicant && supply) {
            await deniedSharing(sharingRequest);
        } else {
            throw new Error(
                "Something doesn't exists, it could be the owner, the applicant or the asked supply."
            );
        }
    } else {
        throw new Error("This sharing request doesn't exists");
    }
};

export { deniedSharingRequest };
