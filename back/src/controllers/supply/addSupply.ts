import Express from 'express';
import User from '../../models/user';
import { supplyRepositoryMongo } from '../../repoMongo/supplyRepository.Mongo';
import userRepositoryMongo from '../../repoMongo/userRepository.Mongo';
import { createNewSupply } from '../../useCases/addSuply.usecase';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

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

        const user = await User.findById(req.body.ownerId);
        if (req.body.name && req.file?.filename && req.session.user) {
            const datas = {
                name: req.body.name,
                owner: req.session.user,
                fileName: req.file?.filename
            };
            const result = await createNewSupply(
                datas,
                supplyRepositoryMongo.addSupply,
                userRepositoryMongo.getUserByUser
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
