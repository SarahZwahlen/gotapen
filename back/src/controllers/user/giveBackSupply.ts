import Express from 'express';
import Supply from '../../models/supply';
import User from '../../models/user';

const giveBackSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        const supply = await Supply.findOne({ _id: req.body.supplyId });
        if (supply) {
            console.log(supply);
            await Supply.updateOne({ _id: supply._id }, { availability: true });
            await User.updateOne(
                { id: req.body.applicantId },
                { $pull: { borrowedSupplies: supply._id } },
            );
            res.json({
                message: 'User gives back a supply',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
        });
    }
};

export default giveBackSupply;
