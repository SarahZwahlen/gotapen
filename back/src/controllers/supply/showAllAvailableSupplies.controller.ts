import Express from 'express';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import showCompanyAvailableSupplies from '../../usecases/supply/showCompanyAvailableSupplies.usecase';

const showAllAvailableSupply = async (
    req: Express.Request,
    res: Express.Response
) => {
    try {
        if (req.session.user) {
            const supplies = await showCompanyAvailableSupplies(
                req.session.user.id,
                userRepositoryMongo,
                companyRepositoryMongo,
                supplyRepositoryMongo
            );

            if (!supplies) {
                res.status(200).json({ message: 'there is no supplies' });
            } else {
                res.status(200).json({
                    supplies: supplies
                });
            }
        } else {
            res.status(401).json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default showAllAvailableSupply;
