import Express from 'express';
import User from '../../models/user';
import Supply from '../../models/supply';

const showSharingRequest = async (
    req: Express.Request,
    res: Express.Response,
) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle
    try {
        const userSharingRequests: object[] = [];
        const user = await User.findOne({ _id: req.body.userId });

        if (user) {
            await Promise.all(
                user.sharingRequests.map(async (request: any) => {
                    const applicant = await User.findOne({
                        _id: request.applicant,
                    });
                    const askedSupply = await Supply.findOne({
                        _id: request.askedSupply,
                    });
                    if (applicant && askedSupply) {
                        userSharingRequests.push({
                            applicantName: applicant.firstname,
                            askedSupply: askedSupply.name,
                        });
                    }
                }),
            );
            res.json({
                rep: userSharingRequests,
            });
        }
    } catch (error) {
        res.json({
            message: 'An error occured',
        });
    }
};

export default showSharingRequest;
