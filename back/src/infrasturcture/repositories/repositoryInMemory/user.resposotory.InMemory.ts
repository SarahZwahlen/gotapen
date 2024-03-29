import { buildCompany, buildUser } from '../../builders/builders.test.utils';
import { UserRepositoryInterface } from '../../models/persistence/UserRepositoryInterface';
import { UserType } from '../../models/user';
import { supplyRepoInMemory } from './supply.respository.inMemory';

const userRepoInMemory: UserRepositoryInterface & {
    users: UserType[];
    reset: () => void;
    givenExistingUser: (user: UserType) => void;
} = {
    users: [],
    reset: function () {
        this.users = [];
    },
    givenExistingUser: function (user: UserType) {
        this.users.push(user);
    },
    getUserById: async function (userId: string) {
        const result = this.users.find((user: UserType) => user.id === userId);

        if (!result) {
            return null;
        } else {
            return result;
        }
    },
    getUserByEmail: async function (userEmail: string) {
        const result = this.users.find((user) => user.email === userEmail);
        if (!result) {
            return null;
        } else {
            return result;
        }
    },
    saveUser: async function (datas) {
        const user = await buildUser({
            email: datas.email,
            password: datas.password,
            firstname: datas.firstname,
            surname: datas.surname,
            company: await buildCompany({ id: datas.companyId })
        });
        this.users.push(user);
        return user;
    },
    deleteUser: async function (userId) {
        supplyRepoInMemory.supplies = supplyRepoInMemory.supplies.filter(
            (supply) => supply.owner.id !== userId
        );

        const user = await this.getUserById(userId);
        if (user) {
            const userIndex = this.users.indexOf(user);
            this.users.splice(userIndex, 1);
        } else {
            throw new Error("This user doesn't exists");
        }
    },
    updateUser: async function (userId, datas) {
        let user = await this.getUserById(userId);
        if (user) {
            await this.deleteUser(user.id);
            user = {
                ...user,
                ...datas
            };
            this.givenExistingUser(user);
            return user;
        } else {
            return null;
        }
    },
    getBorrowedSupplies: async function (userId) {
        const user = await this.getUserById(userId);
        if (user) {
            return user.borrowedSupplies;
        } else {
            throw new Error("This user doesn't exists");
        }
    },
    logUser: async function (email, password) {
        const user = this.users.find((user) => user.email === email);

        if (user) {
            if (user.password === password) {
                return user;
            } else {
                throw new Error('Wrong password');
            }
        } else {
            throw new Error("This user does'nt exists");
        }
    }
};

export { userRepoInMemory };
