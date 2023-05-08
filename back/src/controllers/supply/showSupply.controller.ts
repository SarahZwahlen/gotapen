import { Request, RequestHandler, Response } from 'express';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import {
    ShowSupplyUsecase,
    showSupplyUsecaseCreator
} from '../../usecases/supply/showSupply.usecase';

const showSupplyCreator =
    (usecase: ShowSupplyUsecase): RequestHandler =>
    async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                if (req.body.supplyId) {
                    const supply = await usecase(req.body.supplyId);
                    if (!supply) {
                        res.status(400).json({
                            message: "This supply doesn't exists"
                        });
                        return;
                    }
                    res.status(200).json({
                        message: 'Here is the supply',
                        supply: supply
                    });
                } else {
                    res.status(400).json({
                        message: 'Supply id is missing'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'User is not authentified'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: 'An error occured'
            });
        }
    };

const showSupply = showSupplyCreator(
    showSupplyUsecaseCreator(supplyRepositoryMongo)
);

export default showSupply;
export { showSupplyCreator };
