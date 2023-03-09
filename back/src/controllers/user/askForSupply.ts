import User from '../../models/user';
import Supply from '../../models/supply';
import Express from 'express';

const askForSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        const applicant = await User.findOne({ _id: req.body.applicantId });
        const sharer = await User.findOne({ _id: req.body.sharerId });
        const sharedSupply = await Supply.findOne({
            _id: req.body.sharedSupplyId,
        });

        if (sharer && sharedSupply && applicant) {
            if (
                sharer.supplies.includes(req.body.sharedSupplyId) &&
                sharedSupply.availability === true
            ) {
                await User.updateOne(
                    { _id: req.body.sharerId },
                    {
                        $push: {
                            sharingRequests: {
                                applicant: req.body.applicantId,
                                askedSupply: req.body.sharedSupplyId,
                            },
                        },
                    },
                );
                res.json({
                    message: 'somebody is asking for a supply',
                });
            } else {
                res.json({ message: 'Sharing request failed' });
            }
        }
    } catch (error) {
        res.json({ message: 'Sharing request failed' });
    }
};

export default askForSupply;
