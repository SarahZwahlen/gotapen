import { UserRepositoryInterface } from '../../../domain/repositories/userRepository.interface';
import User from '../../../models/user';

const userRepository: UserRepositoryInterface = {
    getUser: async (userId) => {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return null;
        }

        return user.toObject();
    },
};

export { userRepository };
