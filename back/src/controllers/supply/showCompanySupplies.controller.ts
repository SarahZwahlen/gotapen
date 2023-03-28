import Express from 'express';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
companyRepositoryMongo;

const showCompanySupplies = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            const supplies =
                await supplyRepositoryMongo.getCompanyAvailableSupplies;
            res.json({
                message: 'Here are the supplies',
                supplies: supplies
            });
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

export default showCompanySupplies;
