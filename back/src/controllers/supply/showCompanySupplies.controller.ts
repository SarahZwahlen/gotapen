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
            res.status(200).json({
                message: 'Here are the supplies',
                supplies: supplies
            });
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

export default showCompanySupplies;
