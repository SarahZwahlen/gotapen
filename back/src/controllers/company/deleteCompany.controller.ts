import Company from '../../infrasturcture/models/company';
import Express from 'express';

const deleteCompany = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            if (
                req.session.user.roles.includes('admin') &&
                req.session.user.company.id === req.body.id
            ) {
                await Company.deleteOne({ _id: req.body.id });
                res.status(200).json({
                    message: 'Company deleted'
                });
            } else {
                res.status(401).json({
                    message: 'You have to be an admin of this company'
                });
            }
        } else {
            res.status(401).json({
                message: 'You have to be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default deleteCompany;
