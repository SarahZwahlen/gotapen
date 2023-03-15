import Express from 'express';
import { supplyRepositoryMongo } from '../../repoMongo/supplyRepository.Mongo';
import { deleteSupplyUsecase } from '../../useCases/delteSupply.usecase';

const deleteSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.body.supplyId) {
            if (req.session.user) {
                const result = await deleteSupplyUsecase(
                    req.body.supplyId,
                    supplyRepositoryMongo.deleteSupplyAndAllItsRef
                );

                if (result) {
                    res.json({ message: 'Supply deleted' });
                } else {
                    res.json({
                        message:
                            "An error occured. Maybe the supply doesn't exist in DB"
                    });
                }
            } else {
                res.json({
                    message: 'User is not authentified'
                });
            }
        } else {
            res.json({
                message: 'supplyId is missing'
            });
        }
    } catch (error) {
        res.json({
            message: 'An error occured'
        });
    }
};

export default deleteSupply;
