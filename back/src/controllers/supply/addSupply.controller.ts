import Express from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../infrasturcture/repositories/repositoryMongo/userRepository.Mongo';
import { createNewSupply } from '../../usecases/supply/addSuply.usecase';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (!req.session.user) {
            res.json({
                message: 'User is not logged'
            });
        }

        if (!req.body.name) {
            res.json({
                message: 'The supply name is missing'
            });
        }

        if (!req.file?.filename) {
            res.json({
                message: 'A file is missing'
            });
        }

        // const user = await User.findById(req.body.ownerId);
        if (req.body.name && req.file?.filename && req.session.user) {
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
        }
    } catch (error) {
        res.json({
            message: 'An error occured, pleasy retry',
            error: error
        });
    }
};

export default addSupply;
