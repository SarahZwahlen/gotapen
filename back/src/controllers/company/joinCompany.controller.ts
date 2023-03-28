import Company from '../../infrasturcture/models/company';
import User from '../../infrasturcture/models/user';
import bcrypt from 'bcrypt';
import Express from 'express';

const joinCompany = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            const user = req.session.user;
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
                            { _id: user.id },
                            { company: company }
                        );
                        await Company.updateOne(
                            { _id: req.body.companyId },
                            { employees: user }
                        );
                        res.json({
                            message: 'Company joined'
                        });
                    } else {
                        res.json({
                            message: 'Join company failed'
                        });
                    }
                }
            );
        } else {
            res.json({
                message: 'You have to be logged'
            });
        }
    } catch (error) {
        res.json({
            message: 'An error occured'
        });
    }
};

export default joinCompany;
