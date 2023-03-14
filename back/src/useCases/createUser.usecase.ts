import { UserType } from '../models/user';

const createUser = async (
    email: string,
    password: string,
    firstname: string,
    surname: string,
    saveUser: (
        email: string,
        password: string,
        firstname: string,
        surname: string
    ) => Promise<UserType>,
    getUser: (email: string) => Promise<UserType | null>
): Promise<UserType> => {
    const existingEmail = await getUser(email);

    if (existingEmail) {
        throw new Error('This email is already used by an other user');
    }

    const newUser = await saveUser(email, password, firstname, surname);

    return newUser;
};

export { createUser };
