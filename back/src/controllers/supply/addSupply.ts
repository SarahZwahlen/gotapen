import Supply from '../../models/supply';
import User from '../../models/user';
import Express from 'express';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {
        const newSupply = new Supply({
            ...req.body,
            imagePath: `suppliesImages/${req.file?.filename}`,
        });

        await newSupply.save();
        await User.updateOne(
            { _id: req.body.owner },
            { $push: { supplies: newSupply } },
        );
        res.json({
            message: 'add a supply !',
            isShared: true,
        });
    } catch (error) {
        res.json({
            message: 'An error occured, pleasy retry',
            error: error,
        });
    }
};

export default addSupply;
