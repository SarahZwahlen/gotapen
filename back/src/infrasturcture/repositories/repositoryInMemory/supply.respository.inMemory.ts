import { buildSupply } from '../../builders/builders.test.utils';
import { SupplyRepositoryInterface } from '../../models/persistence/SupplyRepositoryInterface';
import { SupplyType } from '../../models/supply';

const supplyRepoInMemory: SupplyRepositoryInterface & {
    supplies: SupplyType[];
    reset: () => void;
    givenExistingSupply: (supply: SupplyType) => void;
} = {
    supplies: [],
    reset: function () {
        this.supplies = [];
    },
    getSupply: function (supplyId) {
        const result = this.supplies.find((supply) => supply.id === supplyId);
        if (!result) {
            return Promise.resolve(null);
        }
        return Promise.resolve(result);
    },
    givenExistingSupply: function (supply: SupplyType) {
        this.supplies.push(supply);
    },
    addSupply: async function (data) {
        const newSupply = await buildSupply({
            ...data,
            imagePath: `public/images/${data.fileName}`
        });
        this.supplies.push(newSupply);

        return Promise.resolve(newSupply);
    },
    deleteSupplyAndAllItsRef: function (supplyId) {
        this.supplies = this.supplies.filter((s) => s.id !== supplyId);

        return Promise.resolve(true);
    },
    getSupplies: function (userId) {
        return Promise.resolve(
            this.supplies.filter((s) => s.owner.id === userId)
        );
    },
    getAllCompynySupplies: function (companyId) {
        return Promise.resolve(
            this.supplies.filter((s) => s.company.id === companyId)
        );
    },
    getUserAvailableSupplies: function (company) {
        return Promise.resolve(
            this.supplies.filter(
                (s) => s.company.id === company.id && s.availability
            )
        );
    }
};

export { supplyRepoInMemory };
