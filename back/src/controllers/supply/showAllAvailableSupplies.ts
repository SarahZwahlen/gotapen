import Company from '../../models/company';
import User from '../../models/user';
import Express from 'express';
import supplyRepository from '../../repositories/supply.respository';

const showAllAvailableSupply = async (
    req: Express.Request,
    res: Express.Response
) => {
    // Verify user authentification
    try {
        const user = await User.findById(req.session.user);
        if (user.roles === 'user') {
            const company = await Company.findOne(user.company);

            if (company) {
                const availableSupplies =
                    supplyRepository.showUserAvailableSupplies(company);
            } else {
                res.json({
                    message: "This company does'nt exists"
                });
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
