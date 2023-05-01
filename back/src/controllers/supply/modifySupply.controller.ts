import Express from 'express';
import { modifySupplyUseCase } from '../../usecases/supply/modifySupply.usecase';
import { supplyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/supplyRepository.Mongo';
import { SupplyType } from '../../infrasturcture/models/supply';
import fs from 'fs';

const modifySupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            const datas: Partial<
                Pick<SupplyType, 'name' | 'imagePath'> & {
                    availability: string;
                }
            > = {
                name: req.body.name,
                availability: req.body.availability
            };
            if (req.file) {
                datas.imagePath = `/images/${req.file.filename}`;

                const currentSupply = await supplyRepositoryMongo.getSupply(
                    req.body.id
                );
                console.log('currentSupply', currentSupply);
                if (currentSupply) {
                    fs.rmSync(`public/${currentSupply.imagePath}`, {
                        force: true
                    });
                }
            }
            const modifiedSupply = await modifySupplyUseCase(
                req.body.id,
                datas,
                supplyRepositoryMongo
            );
            res.status(200).json({
                message: 'Supply modified',
                supply: modifiedSupply
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

export default modifySupply;
