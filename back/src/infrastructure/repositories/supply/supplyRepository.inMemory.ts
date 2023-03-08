import { randomUUID } from 'crypto';
import { Supply } from 'src/domain/models/supply';
import { SupplyRepositoryInterface } from 'src/domain/repositories/supplyRepository.interface';

const supplyRepositoryInMemory: SupplyRepositoryInterface & {
    supplies: Supply[];
    reset: () => void;
} = {
    supplies: [],
    reset: function () {
        this.supplies = [];
    },
    addSupply: function (supply) {
        const newSupply = { ...supply, id: randomUUID() };
        this.supplies.push(newSupply);
        return Promise.resolve(newSupply);
    },
};

export { supplyRepositoryInMemory };
