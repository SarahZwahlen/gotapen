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
    addSupply: async function (name, user, company, imagePath) {
        const newSupply = await buildSupply({
            name: name,
            owner: user,
            company: company,
            imagePath: `public/images/${imagePath}`
        });
        this.supplies.push(newSupply);

        return Promise.resolve(newSupply);
    },
    deleteSupplyAndAllItsRef: function (supplyId) {
        this.supplies = this.supplies.filter((s) => s.id !== supplyId);

        return Promise.resolve(true);
    },
    getSupplies: function (userId) {
        const result = this.supplies.filter((s) => s.owner.id === userId);
        return Promise.resolve(
            this.supplies.filter((s) => s.owner.id === userId)
        );
    },
    getAllCompynySupplies: function (companyId) {
        return Promise.resolve(
            this.supplies.filter((s) => s.company.id === companyId)
        );
    },
    getCompanyAvailableSupplies: function (company, userId) {
        return Promise.resolve(
            this.supplies.filter(
                (s) =>
                    s.company.id === company.id &&
                    s.availability &&
                    s.owner.id !== userId
            )
        );
    },
    modifySupply: async function (supplyId, datas) {
        const supplyToModify = await this.getSupply(supplyId);
        if (supplyToModify) {
            if (datas.name) {
                supplyToModify.name = datas.name;
            }
            if (datas.availability) {
                if (datas.availability === 'false') {
                    supplyToModify.availability = false;
                }
                if (datas.availability === 'true') {
                    supplyToModify.availability === true;
                }
            }
            if (datas.imagePath) {
                supplyToModify.imagePath = datas.imagePath;
            }
            return Promise.resolve(supplyToModify);
        } else {
            return null;
        }
    }
};

export { supplyRepoInMemory };
