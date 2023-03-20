import { Request, Response } from 'express';

const logOutController = (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            req.session.destroy(() => console.log('Session destroyed'));
            res.json({
                message: 'Log out succeed'
            });
        } else {
            res.json({
                message: 'User is not logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default logOutController;
