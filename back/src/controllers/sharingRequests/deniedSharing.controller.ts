import Express from 'express';
import SharingRequest from '../../infrasturcture/models/sharingRequest';
import { sharingRequestRepository } from '../../infrasturcture/repositories/repositoryMongo/sharingRequestRepository.Mongo';

const deniedSharing = async (req: Express.Request, res: Express.Response) => {
    try {
        const sharingRequest = await SharingRequest.findOne({
            _id: req.body.sharingRequestId
        });

        console.log(sharingRequest);
        if (sharingRequest) {
            await sharingRequestRepository.deniedSharingRequest(sharingRequest);

            res.json({
                message: 'The other user denied the sharing request',
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
export default deniedSharing;
