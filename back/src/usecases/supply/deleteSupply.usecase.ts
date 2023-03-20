const deleteSupplyUsecase = async (
    supplydId: string,
    // loggedUserId: string,
    deleteEverySupplyReferences: (supplyId: string) => Promise<boolean>
): Promise<void> => {
    await deleteEverySupplyReferences(supplydId);
};

export { deleteSupplyUsecase };
