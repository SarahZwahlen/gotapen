import { Request, Response } from 'express';
import { supplyRepositoryMongo } from '../../repoMongo/supplyRepository.Mongo';
import { showSupplyUseCase } from './showSupply.usecase';

const showSupply = async (req: Request, res: Response) => {
    try {
        if (req.session.user) {
            if (req.body.supplyId) {
                const supply = await showSupplyUseCase(
                    req.body.supplyId,
                    supplyRepositoryMongo.getSupply
                );
                if (!supply) {
                    res.json({ message: "This supply doesn't exists" });
                }

                res.json({ message: 'Here is the supply', supply: supply });
            } else {
                res.json({
                    message: 'Supply id is missing'
                });
            }
        } else {
            res.json({
                message: 'User is not authentified'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default showSupply;
