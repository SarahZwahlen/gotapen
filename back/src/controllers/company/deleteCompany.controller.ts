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
                res.json({
                    message: 'Company deleted'
                });
            } else {
                res.json({
                    message: 'You have to be an admin of this company'
                });
            }
        } else {
            res.json({
                message: 'You have to be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default deleteCompany;
