import express from 'express';
import createAccount from '../user/createAccount/createAccount.controller';
import addSupply from '../supply/addSupply/addSupply.controller';
import deleteSupply from '../supply/deleteSupply/deleteSupply.controller';
import modifySupply from '../supply/modifySupply/modifySupply';
import showCompanySupplies from '../supply/showCompanySupplies/showCompanySupplies.controller';
import createCompany from '../company/createCompany/createCompany.controller';
import joinCompany from '../company/joinCompany/joinCompany.controller';
import deleteCompany from '../company/deleteCompany/deleteCompany.controller';
import showReceivedSharingRequest from '../sharingRequest/showReceivedSharingRequests/showReceivedSharingRequests.controller';
import showSentSharingRequests from '../sharingRequest/showSentSharingRequests/showSentSharingRequests.controller';
import sendSharingRequest from '../sharingRequest/sendSharingRequest/sendSharingRequest.controller';
import acceptSharing from '../sharingRequest/acceptSharing/acceptSharing.controller';
import deniedSharing from '../sharingRequest/deniedSharing/deniedSharing.controller';
import giveBackSupply from '../supply/givebackSupply/giveBackSupply.controller';
import loginController from '../user/login/login.controller';
import { uploadMulterSingleFile } from '../middlewares/multerUpload';
import showSupply from '../supply/showSupply/showSupply.controller';
import logOutController from '../user/logout/logout.controller';
import deleteUser from '../user/deleteUser/deleteUser.controller';

const router = express.Router();

router.get('/show-supplies', showCompanySupplies);
router.get('/show-received-sharing-requests', showReceivedSharingRequest);
router.get('/show-sent-sharing-requests', showSentSharingRequests);

router.post('/create-account', createAccount);
router.post('/login', loginController);
router.post('/add-supply', uploadMulterSingleFile, addSupply);
router.post('/modify-supply', uploadMulterSingleFile, modifySupply);
router.post('/create-company', createCompany);
router.post('/show-supply', showSupply);
router.post('/join-company', joinCompany);
router.post('/send-sharing-request', sendSharingRequest);
router.post('/accept-sharing', acceptSharing);
router.post('/denied-sharing', deniedSharing);

router.delete('/delete-supply', deleteSupply);
router.delete('/delete-company', deleteCompany);
router.delete('/give-back-supply', giveBackSupply);
router.delete('/logout', logOutController);
router.delete('/delete-user', deleteUser);

export default router;
