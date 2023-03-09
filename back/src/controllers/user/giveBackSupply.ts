import Express from 'express';
import Supply from '../../models/supply';
import User from '../../models/user';

const giveBackSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        await Supply.updateOne(
            { _id: req.body.supplyId },
            { availability: true },
        );
        const supplyToGiveBack = await Supply.findOne({
            _id: req.body.supplyId,
        });
        if (supplyToGiveBack) {
            await User.updateOne(
                { id: req.body.applicantId },
                { $pull: { borrowedSupplies: supplyToGiveBack._id } },
            );
            res.json({
                message: 'Supply is gived back',
                isGivedBack: true,
            });
        } else {
            res.json({
                message: 'Something is wrong with this supply',
                idGivedBack: false,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occurend',
        });
    }
};

export default giveBackSupply;
