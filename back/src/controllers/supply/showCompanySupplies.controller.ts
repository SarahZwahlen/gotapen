import Express from 'express';
import { companyRepoMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongos';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import { getAllCompanySupplies } from '../../usecases/supply/showCompanySupplies.usecase';

const showCompanySupplies = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            const supplies = getAllCompanySupplies(
                req.body.companyId,
                req.body.user.id,
                companyRepoMongo.getCompany,
                companyRepoMongo.getCompanyByUser,
                supplyRepositoryMongo.getAllCompynySupplies
            );
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
