type Supply = {
    id: string;
    name: string;
    owner: string;
    availability: boolean;
};

type UnexistingSupply = Omit<Supply, 'id'>;

export type { Supply, UnexistingSupply };
