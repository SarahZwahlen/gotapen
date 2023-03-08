import Company from '../../models/company';
import User from '../../models/user';
import bcrypt from 'bcrypt';
import Express from 'express';

const joinCompany = async (req: Express.Request, res: Express.Response) => {
    const user = await User.findOne({ _id: req.body.userId });
    const company = await Company.findOne({ _id: req.body.companyId });
    if (!company) {
        return res.json({ message: 'no company' });
    }

    bcrypt.compare(
        req.body.joinCode,
        company.joinCode,
        async (error, result) => {
            if (result === true) {
                await User.updateOne(
                    { _id: req.body.userId },
                    { company: company },
                );
                await Company.updateOne(
                    { _id: req.body.companyId },
                    { employees: user },
                );
                res.json({
                    message: 'try to join company',
                });
            } else {
                res.json({
                    message: 'Join company failed',
                });
            }
        },
    );
};

export default joinCompany;
