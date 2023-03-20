import { RequestHandler, Request, Response } from 'express';
import { supplyRepositoryMongo } from '../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import {
    ShowSupplyUsecase,
    showSupplyUsecaseCreator
} from '../usecases/showSupply.usecase';
const showSupplyCreator =
    (usecase: ShowSupplyUsecase): RequestHandler =>
    async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                if (req.body.supplyId) {
                    const supply = await usecase(req.body.supplyId);
                    if (!supply) {
                        res.json({ message: "This supply doesn't exists" });
                        return;
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
            res.json({
                message: 'An error occured'
            });
        }
    };

const showSupply = showSupplyCreator(
    showSupplyUsecaseCreator(supplyRepositoryMongo)
);

// const showSupply: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         if (req.session.user) {
//             if (req.body.supplyId) {
//                 const supply = await showSupplyUseCase(
//                     req.body.supplyId,
//                     supplyRepositoryMongo.getSupply
//                 );
//                 if (!supply) {
//                     res.json({ message: "This supply doesn't exists" });
//                 }

//                 res.json({ message: 'Here is the supply', supply: supply });
//             } else {
//                 res.json({
//                     message: 'Supply id is missing'
//                 });
//             }
//         } else {
//             res.json({
//                 message: 'User is not authentified'
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({
//             message: 'An error occured'
//         });
//     }
// };

export default showSupply;
export { showSupplyCreator };
