import User from '../../models/user';
import { Response, Request } from 'express';
import { logUser } from '../../useCases/logUser.usecase';

const getUserWithMongo = (email: string) => User.findOne({ email });

const loginController = async (req: Request, res: Response) => {
    try {
        const user = await logUser(
            req.body.email,
            req.body.password,
            getUserWithMongo
        );
        req.session.user = user;
        res.json({
            message: 'Authentification succeed'
        });
    } catch (error) {
        res.status(401).json({
            message: "This user doesn't exists"
        });
    }

    // const user = await User.findOne({ email: req.body.email });

    // if (user) {
    //     const receivedPassword = req.body.password;
    //     const isAuthentified = await userRepository.login(
    //         receivedPassword,
    //         user
    //     );

    //     if (isAuthentified) {
    //         req.session.user = user;
    //         res.json({
    //             message: 'Authentification succeed'
    //         });
    //     } else {
    //         res.json({
    //             message: 'Authentification failed'
    //         });
    //     }
    // } else {
    //     res.json({
    //         message: "This user doesn't exists"
    //     });
    // }
};

export default loginController;
