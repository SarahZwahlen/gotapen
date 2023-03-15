import express from 'express';
import createAccount from '../controllers/user/createAccount';
import addSupply from '../controllers/supply/addSupply';
import deleteSupply from '../controllers/supply/deleteSupply';
import modifySupply from '../controllers/supply/modifySupply';
import showSupplies from '../controllers/supply/showSupplies';
import createCompany from '../controllers/company/createCompany';
import joinCompany from '../controllers/company/joinCompany';
import deleteCompany from '../controllers/company/deleteCompany';
import showReceivedSharingRequest from '../controllers/sharingRequest/showReceivedSharingRequests';
import showSentSharingRequests from '../controllers/sharingRequest/showSentSharingRequests';
import sendSharingRequest from '../controllers/sharingRequest/sendSharingRequest';
import acceptSharing from '../controllers/sharingRequest/acceptSharing';
import deniedSharing from '../controllers/sharingRequest/deniedSharing';
import giveBackSupply from '../controllers/supply/giveBackSupply';
import loginController from '../controllers/user/login';
import { uploadMulterSingleFile } from '../middlewares/multerUpload';

const router = express.Router();

router.get('/show-supplies', showSupplies);
router.get('/show-received-sharing-requests', showReceivedSharingRequest);
router.get('/show-sent-sharing-requests', showSentSharingRequests);

router.post('/create-account', createAccount);
router.post('/login', loginController);

router.post('/add-supply', uploadMulterSingleFile, addSupply);
router.post('/modify-supply', uploadMulterSingleFile, modifySupply);
router.post('/create-company', createCompany);
router.post('/join-company', joinCompany);
router.post('/send-sharing-request', sendSharingRequest);
router.post('/accept-sharing', acceptSharing);
router.post('/denied-sharing', deniedSharing);

router.delete('/delete-supply', deleteSupply);
router.delete('/delete-company', deleteCompany);
router.delete('/give-back-supply', giveBackSupply);

export default router;
