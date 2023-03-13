import Express from 'express';
import SharingRequest from '../../models/sharingRequest';
import { sharingRequestRepository } from '../../repositories/sharingRequest.repository';

const acceptSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        const sharingRequest = await SharingRequest.findOne({
            _id: req.body.sharingRequestId
        });

        console.log(sharingRequest);
        if (sharingRequest) {
            await sharingRequestRepository.acceptSharingRequest(sharingRequest);

            res.json({
                message: 'done',
                request: sharingRequest
            });
        } else {
            res.json({
                message: "This request doesn't exists"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured'
        });
    }
};
export default acceptSharing;
