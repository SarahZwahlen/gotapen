import { SupplyRepositoryInterface } from '../../infrasturcture/models/persistence/SupplyRepositoryInterface';
import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';

const sendSharingRequestUseCase = async (
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
    const supply = await supplyRepo.getSupply(supplyId);
    if (supply) {
        const owner = await userRepo.getUserById(supply?.owner.id);
        const applicant = await userRepo.getUserById(applicantId);
        if (owner && applicant) {
            await sendSharingRq(owner.id, applicantId, supply.id);
        } else {
            throw new Error("Owner or applicant doesn't exists");
        }
    } else {
        throw new Error("This supply doesn't exists");
    }
};

export { sendSharingRequestUseCase };
