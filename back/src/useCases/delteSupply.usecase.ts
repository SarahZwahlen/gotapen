const deleteSupplyUsecase = async (
    supplydId: string,
    // loggedUserId: string,
    deleteEverySupplyReferences: (supplyId: string) => Promise<boolean>
): Promise<boolean> => {
    const isDeleted = await  (supplydId);
    if (isDeleted) {
        return true;
    } else {
        return false;
    }
};

export { deleteSupplyUsecase };
