import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';

const sendSharingRequestUseCase = async (
    ownerId: string,
    applicantId: string,
    supplyId: string,
    userRepo: UserRepositoryInterface,
    supplyRepo: SupplyRepositoryInterface,
    sendSharingRq: (
        ownerId: string,
        applicantId: string,
        supplyId: string
    ) => Promise<void>
) => {
    const owner = await userRepo.getUserById(ownerId);
    const applicant = await userRepo.getUserById(applicantId);
    const supply = await supplyRepo.getSupply(supplyId);

    if (supply) {
        if (owner && applicant) {
            await sendSharingRq(ownerId, applicantId, supplyId);
        } else {
            throw new Error("Owner or applicant doesn't exists");
        }
    } else {
        throw new Error("This supply doesn't exists");
    }
};

export { sendSharingRequestUseCase };
