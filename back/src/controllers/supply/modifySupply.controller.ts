import Supply from '../../infrasturcture/models/supply';
import fs from 'fs';
import Express from 'express';

const modifySupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        if (req.session.user) {
            const fileToUpdate = await Supply.findOne({ _id: req.body.id });
            console.log('here', req.body);
            console.log('here too', req.file);
            if (req.file) {
                if (fileToUpdate) {
                    fs.unlink(`public/${fileToUpdate.imagePath}`, () =>
                        console.log('Image is deleted')
                    );
                }
                await Supply.updateOne(
                    { _id: req.body.id },
                    { imagePath: `suppliesImages/${req.file?.filename}` }
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
