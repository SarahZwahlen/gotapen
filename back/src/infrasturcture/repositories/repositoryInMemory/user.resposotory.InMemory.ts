import { buildUser } from '../../builders/builders.test.utils';
import { UserRepositoryInterface } from '../../models/persistence/UserRepositoryInterface';
import { UserType } from '../../models/user';

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
        const result = this.users.find(
            (user: UserType) => user.email === userEmail
        );

        if (!result) {
            return null;
        } else {
            return result;
        }
    },
    saveUser: async function (datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
    }) {
        const user = await buildUser({
            email: datas.email,
            password: datas.password,
            firstname: datas.firstname,
            surname: datas.surname
        });
        this.users.push(user);
        return user;
    },
    deleteUser: async function (userId) {
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
        } else {
            return;
        }
    },
    getBorrowedSupplies: async function (userId) {
        const user = await this.getUserById(userId);
        if (user) {
            return user.borrowedSupplies;
        } else {
            throw new Error("This user doesn't exists");
        }
    }
};

export { userRepoInMemory };
