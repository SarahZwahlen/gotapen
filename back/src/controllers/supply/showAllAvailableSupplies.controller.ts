import Company from '../../infrasturcture/models/company';
import User from '../../infrasturcture/models/user';
import Express from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';

const showAllAvailableSupply = async (
    req: Express.Request,
    res: Express.Response
) => {
    // Verify user authentification
    try {
        const user = await User.findById(req.session.user);
        if (user) {
            if (user.roles.includes('user')) {
                const company = await Company.findOne(user.company);

                if (company) {
                    const availableSupplies =
                        supplyRepositoryMongo.getUserAvailableSupplies(company);
                } else {
                    res.json({
                        message: "This company does'nt exists"
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default showAllAvailableSupply;
