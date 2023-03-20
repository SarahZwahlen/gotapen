import { UserType } from "../../models/user";

const userRepoInMemory = {
    users: [],
    reset: function () {
        this.users = [];
    }
    // givenExistingUser: function (user: UserType) {
    //     this.users.push(user);
    // }
    updateUser:(datas:Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>) => {
        
    },
};
