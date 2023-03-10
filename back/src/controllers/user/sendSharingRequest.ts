import User from '../../models/user';
import Supply from '../../models/supply';
import Express from 'express';
import SharingRequest from '../../models/sharingRequest';

const sendSharingRequest = async (
    req: Express.Request,
    res: Express.Response,
) => {
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
                const newSharingRequest = new SharingRequest({
                    applicant: req.body.applicantId,
                    sharer: req.body.sharerId,
                    sharedSupply: req.body.sharedSupplyId,
                });

                sharer.receivedSharingRequests = [
                    ...sharer.receivedSharingRequests,
                    newSharingRequest,
                ];
                applicant.sentSharingRequests = [
                    ...applicant.sentSharingRequests,
                    newSharingRequest,
                ];

                await newSharingRequest.save();
                await User.updateOne(
                    { _id: req.body.sharerId },
                    {
                        $push: {
                            receivedSharingRequests: newSharingRequest,
                        },
                    },
                );
                await User.updateOne(
                    { _id: req.body.applicantId },
                    {
                        $push: {
                            sentSharingRequests: newSharingRequest,
                        },
                    },
                );
                res.json({
                    message: 'somebody is asking for a supply',
                    request: newSharingRequest,
                    applicant: applicant,
                    sharer: sharer,
                });
            } else {
                res.json({
                    message:
                        'Sharing request failed. The supply may not be available or does not exists anymore',
                });
            }
        }
    } catch (error) {
        res.json({ message: 'Sharing request failed' });
    }
};

export default sendSharingRequest;
