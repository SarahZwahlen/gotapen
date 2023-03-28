import Express from 'express';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import showCompanyAvailableSupplies from '../../usecases/supply/showCompanyAvailableSupplies.usecase';

const showAllAvailableSupply = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            const supplies = await showCompanyAvailableSupplies(
                req.session.user.company,
                companyRepositoryMongo,
                supplyRepositoryMongo
            );

            if (!supplies) {
                res.json({ message: 'there is no supplies' });
            }

            res.json({
                supplies: supplies
            });
        } else {
            res.json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default showAllAvailableSupply;
