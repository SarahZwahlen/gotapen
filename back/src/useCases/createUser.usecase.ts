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
    // si non creer un user

    return newUser;
};

// const saveUserMongo = (
//     email: string,
//     password: string,
//     firstname: string,
//     surname: string
// ) => {
//     const user = new User({
//         email,
//         firstname,
//         surname,
//         password: await bcrypt(password, 10)
//     });

//     user.save();

//     return user;
// };

export { createUser };
