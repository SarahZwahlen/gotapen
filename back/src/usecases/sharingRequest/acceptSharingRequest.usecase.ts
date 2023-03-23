import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import SharingRequest, {
    SharingRequestType
} from '../../infrasturcture/models/sharingRequest';
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

    const SRapplicantDatas = await SharingRequest.findById(
        sharingRequestId
    ).populate('applicant');
    const SRSharerDatas = await SharingRequest.findById(
        sharingRequestId
    ).populate('sharer');
    const SRSupplyDatas = await SharingRequest.findById(
        sharingRequestId
    ).populate('sharedSupply');

    if (sharingRequest) {
        const owner = await getUser(SRSharerDatas!.sharer.id);
        const applicant = await getUser(SRapplicantDatas!.applicant.id);
        const supply = await getSupply(SRSupplyDatas!.sharedSupply.id);

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
