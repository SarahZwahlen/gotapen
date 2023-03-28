import Express from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { createNewSupply } from '../../usecases/supply/addSuply.usecase';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            if (req.body.name) {
                if (req.file?.filename) {
                    console.log(req.session.user);
                    const datas = {
                        name: req.body.name,
                        owner: req.session.user,
                        fileName: req.file?.filename
                    };
                    const result = await createNewSupply(
                        datas,
                        supplyRepositoryMongo.addSupply,
                        userRepositoryMongo.getUserByEmail
                    );

                    res.json({
                        message: 'Supply is created',
                        supply: result
                    });
                } else {
                    res.json({
                        error: 'A file is missing'
                    });
                }
            } else {
                res.json({
                    error: 'The supply name is missing'
                });
            }
        } else {
            res.json({
                error: 'User is not logged'
            });
        }
    } catch (error) {
        res.json({
            message: 'An error occured, pleasy retry',
            error: error
        });
    }
};

export default addSupply;
