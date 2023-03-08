import { User } from 'src/domain/models/user';
import { UserRepositoryInterface } from 'src/domain/repositories/userRepository.interface';

const userRepositoryInMemory: UserRepositoryInterface & {
    users: User[];
    givenExistingUser: (user: User) => void;
    reset: () => void;
} = {
    users: [],
    reset: function () {
        this.users = [];
    },
    givenExistingUser: function (user) {
        this.users.push(user);
    },
    getUser: function (userId) {
        const user = this.users.find((user) => user.id === userId);
        if (!user) {
            return Promise.resolve(null);
        }
        return Promise.resolve(user);
    },
};

export { userRepositoryInMemory };
