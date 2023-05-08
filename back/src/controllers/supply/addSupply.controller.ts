import Express from 'express';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { createNewSupply } from '../../usecases/supply/addSuply.usecase';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            if (req.body.name) {
                if (req.file?.filename) {
                    const datas = {
                        imagePath: req.file?.filename,
                        name: req.body.name
                    };
                    const result = await createNewSupply(
                        req.session.user.id,
                        datas,
                        userRepositoryMongo,
                        companyRepositoryMongo,
                        supplyRepositoryMongo
                    );

                    res.status(200).json({
                        message: 'Supply is created',
                        supply: result
                    });
                } else {
                    res.status(400).json({
                        error: 'A file is missing'
                    });
                }
            } else {
                res.status(400).json({
                    error: 'The supply name is missing'
                });
            }
        } else {
            res.status(401).json({
                error: 'User is not logged'
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'An error occured, pleasy retry',
            error: error
        });
    }
};

export default addSupply;
