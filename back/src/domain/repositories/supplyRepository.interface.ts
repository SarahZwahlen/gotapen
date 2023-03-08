import { Supply, UnexistingSupply } from '../models/supply';

type SupplyRepositoryInterface = {
    addSupply: (supply: UnexistingSupply) => Promise<Supply>;
};

export type { SupplyRepositoryInterface };
