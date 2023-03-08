import fs from 'fs';
import Supply from '../../models/supply';
import Express from 'express';

const deleteSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {
        const supplyToDelete = await Supply.findOne({ _id: req.body.id });
        if (!supplyToDelete) {
            return res.json({
                message: 'error',
            });
        }
        console.log(supplyToDelete);

        fs.unlink(`public/${supplyToDelete.imagePath}`, () =>
            console.log('pic deleted'),
        );
        await Supply.deleteOne({ _id: req.body.id });
        res.json({
            message: 'try to delete a supply',
        });
    } catch (error) {
        res.json({
            message: 'An error occured',
        });
    }
};

export default deleteSupply;
