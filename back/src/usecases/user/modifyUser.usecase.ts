import { UserRepositoryInterface } from '../../infrasturcture/models/persistence/UserRepositoryInterface';
import { UserType } from '../../infrasturcture/models/user';
import { emailValidator } from '../../utils/emailValidator';

const modifyUser = async (
    userId: string,
    datas: Partial<
        Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>
    >,
    userRepo: UserRepositoryInterface
) => {
    const user = await userRepo.getUserById(userId);
    if (user) {
        const updatePayload: Partial<
            Pick<UserType, 'email' | 'password' | 'firstname' | 'surname'>
        > = {};
        if (datas.email) {
            if (emailValidator(datas.email!)) {
                updatePayload.email = datas.email;
            } else {
                throw new Error('This email is not valid');
            }
        }
        if (datas.password) {
            updatePayload.password = datas.password;
        }
        if (datas.surname) {
            updatePayload.surname = datas.surname;
        }
        if (datas.firstname) {
            updatePayload.firstname = datas.firstname;
        }
        return await userRepo.updateUser(userId, updatePayload);
    } else {
        throw new Error("This user doesn't exists");
    }
};

export { modifyUser };
