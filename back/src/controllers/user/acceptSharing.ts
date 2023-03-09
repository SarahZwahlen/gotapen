import Express from 'express';
import Supply from '../../models/supply';
import User from '../../models/user';

const acceptSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        const applicant = await User.findOne({ _id: req.body.applicant });
        const owner = await User.findOne({ _id: req.body.ownerId });
        const askedSupply = await Supply.findOne({ _id: req.body.supplyId });

        if (askedSupply && applicant && owner) {
            console.log(applicant.surname, askedSupply.name, owner.surname);
            await User.updateOne(
                { _id: req.body.applicant },
                { $push: { borrowedSupplies: askedSupply } },
            );
            await Supply.updateOne(
                { _id: req.body.supplyId },
                { availability: false },
            );
            await User.updateOne(
                { _id: req.body.ownerId },
                {
                    $pull: {
                        sharingRequests: {
                            _id: req.body.sharingRequestId,
                        },
                    },
                },
            );
            res.json({
                message: 'done',
            });
        } else {
            res.json({
                message: 'An error occured',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured',
        });
    }
};
export default acceptSharing;
