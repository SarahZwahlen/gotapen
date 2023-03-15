const deleteSupplyUsecase = async (
    supplydId: string,
    // loggedUserId: string,
    deleteEverySupplyReferences: (supplyId: string) => Promise<boolean>
): Promise<boolean> => {
    const isDeleted = await deleteEverySupplyReferences(supplydId);
    if (isDeleted) {
        return true;
    } else {
        return false;
    }
    // Delete le supply
    // delete les sharing requests en référence à ce supply
    // delete les sent sharing request en références à ce supply
    // delete les received sharing requests en référence à ce supply
};

export { deleteSupplyUsecase };
