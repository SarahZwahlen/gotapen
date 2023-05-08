import { Request, Response } from 'express';

const logOutController = (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            req.session.destroy(() => console.log('Session destroyed'));
            res.status(200).json({
                message: 'Log out succeed'
            });
        } else {
            res.status(401).json({
                message: 'User is not logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default logOutController;
