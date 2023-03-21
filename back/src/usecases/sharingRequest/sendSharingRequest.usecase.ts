import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { SupplyType } from '../../infrasturcture/models/supply';
import { UserType } from '../../infrasturcture/models/user';

const sendSharingRequest = async (
    ownerId: string,
    applicantId: string,
    supplyId: string,
    userRepo: UserRepositoryInterface,
    getSupply: (supplyId: string) => Promise<SupplyType | null>,
    sendSharingRq: (owner: UserType, applicant: UserType) => Promise<void>
) => {
    const owner = await userRepo.getUserById(ownerId);
    const applicant = await userRepo.getUserById(applicantId);
    const supply = await getSupply(supplyId);

    if (!supply) {
        if (owner && applicant) {
            await sendSharingRq(owner, applicant);
        } else {
            throw new Error("Owner or applicant doesn't exists");
        }
    } else {
        throw new Error("This supply doesn't exists");
    }
};

export { sendSharingRequest };
