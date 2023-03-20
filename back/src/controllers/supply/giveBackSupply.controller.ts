import Express from 'express';
import Supply from '../../infrasturcture/models/supply';
import User from '../../infrasturcture/models/user';

const giveBackSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        const supply = await Supply.findOne({ _id: req.body.supplyId });
        if (supply) {
            await Supply.updateOne({ _id: supply._id }, { availability: true });
            await User.updateOne(
                { _id: req.body.applicantId },
                {
                    $pull: {
                        borrowedSupplies: supply._id
                    }
                }
            );
            res.json({
                message: 'User gives back a supply'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};

export default giveBackSupply;
