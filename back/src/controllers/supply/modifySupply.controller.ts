import Supply from '../../infrasturcture/models/supply';
import fs from 'fs';
import Express from 'express';
import { filePath } from '../../utils/filespaths.utils';

const modifySupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        if (req.session.user) {
            const fileToUpdate = await Supply.findOne({ _id: req.body.id });

            if (req.file) {
                if (fileToUpdate) {
                    fs.rmSync(`public/${fileToUpdate.imagePath}`, {
                        force: true
                    });
                }
                await Supply.updateOne(
                    { _id: req.body.id },
                    { imagePath: filePath(req.file?.filename) }
                );
            }
            if (req.body) {
                await Supply.updateOne({ _id: req.body.id }, { ...req.body });
            }
            res.json({
                message: 'Supply modified'
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
