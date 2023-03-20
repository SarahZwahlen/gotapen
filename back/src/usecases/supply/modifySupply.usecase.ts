import { SupplyType } from '../../infrasturcture/models/supply';

const modifySupplyUseCase = async (
    datas: Partial<SupplyType>,
    getSupply: (supplyId: string) => Promise<SupplyType>,
    modifySupply: (datas: Partial<SupplyType>) => Promise<void>
): Promise<void> => {
    if (datas.id) {
        const supplyToModify = await getSupply(datas.id);
        if (supplyToModify) {
            return await modifySupply(datas);
        }
    } else {
        throw new Error("This supply doesn't exists");
    }
    // vérifier existence du supply
    // vérifier que le supply appartient au logged user
    // id du supply a modifier
    // donnée à modifier dans le supply
};

export { modifySupplyUseCase };
