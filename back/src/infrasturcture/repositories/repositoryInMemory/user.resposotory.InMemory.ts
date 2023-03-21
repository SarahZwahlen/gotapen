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
        console.log(this.users);
        console.log(userId);
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
    deleteUser: async function (userId: string) {},
    updateUser: async function () {}
};

export { userRepoInMemory };
