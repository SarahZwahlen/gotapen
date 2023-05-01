import { UserType } from '../../infrasturcture/models/user';
import { emailValidator } from '../../utils/emailValidator';

const createUser = async (
    datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
    },
    saveUser: (datas: {
        email: string;
        password: string;
        firstname: string;
        surname: string;
    }) => Promise<UserType>,
    getUser: (email: string) => Promise<UserType | null>
): Promise<UserType> => {
    // Validate if email is an email

    if (emailValidator(datas.email)) {
        const existingEmail = await getUser(datas.email);

        if (existingEmail) {
            throw new Error('This email is already used by an other user');
        }

        const newUser = await saveUser(datas);

        return newUser;
    } else {
        throw new Error('This email is not valid');
    }
};

export { createUser };
