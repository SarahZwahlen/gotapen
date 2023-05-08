import Express from 'express';
import Supply from '../../infrasturcture/models/supply';
import User from '../../infrasturcture/models/user';

const giveBackSupply = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            const supply = await Supply.findOne({ _id: req.body.supplyId });
            if (supply) {
                await Supply.updateOne(
                    { _id: supply._id },
                    { availability: true }
                );
                await User.updateOne(
                    { _id: req.session.user.id },
                    {
                        $pull: {
                            borrowedSupplies: supply._id
                        }
                    }
                );
                res.status(200).json({
                    message: 'User gives back a supply'
                });
            } else {
                res.status(400).json({
                    message: "This supply doesn't exists"
                });
            }
        } else {
            res.status(401).json({
                message: 'You have to be logged'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'An error occured'
        });
    }
};

export default giveBackSupply;
