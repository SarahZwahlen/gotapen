import Company from '../../models/company';
import Express from 'express';

const deleteCompany = async (req: Express.Request, res: Express.Response) => {
    try {
        await Company.deleteOne({ _id: req.body.id });
        res.json({
            message: 'Company deleted'
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default deleteCompany;
