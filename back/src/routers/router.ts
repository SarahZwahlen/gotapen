import express from 'express';
import createAccount from '../controllers/user/createAccount.controller';
import addSupply from '../controllers/supply/addSupply.controller';
import deleteSupply from '../controllers/supply/deleteSupply.controller';
import modifySupply from '../controllers/supply/modifySupply.controller';
import showCompanySupplies from '../controllers/supply/showCompanySupplies.controller';
import createCompany from '../controllers/company/createCompany.controller';
import joinCompany from '../controllers/company/joinCompany.controller';
import deleteCompany from '../controllers/company/deleteCompany.controller';
import showReceivedSharingRequest from '../controllers/sharingRequests/showReceivedSharingRequests.controller';
import showSentSharingRequests from '../controllers/sharingRequests/showSentSharingRequests.controller';
import sendSharingRequest from '../controllers/sharingRequests/sendSharingRequest.controller';
import acceptSharing from '../controllers/sharingRequests/acceptSharing.controller';
import deniedSharing from '../controllers/sharingRequests/deniedSharing.controller';
import giveBackSupply from '../controllers/supply/giveBackSupply.controller';
import loginController from '../controllers/user/login.controller';
import { uploadMulterSingleFile } from '../middlewares/multerUpload';
import showSupply from '../controllers/supply/showSupply.controller';
import logOutController from '../controllers/user/logout.controller';
import deleteUser from '../controllers/user/deleteUser.controller';
import showUserSupplies from '../controllers/supply/getUserSupplies.controller';
import showUserDatas from '../controllers/user/getUserDatas.controller';
import updateUserDatas from '../controllers/user/updateUserDatas.controller';

const router = express.Router();

router.get('/show-supplies', showCompanySupplies);
router.get('/show-received-sharing-requests', showReceivedSharingRequest);
router.get('/show-sent-sharing-requests', showSentSharingRequests);
router.get('/show-user-supplies', showUserSupplies);
router.get('/show-user-datas', showUserDatas);

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
router.post('/modify-user', updateUserDatas);

router.delete('/delete-supply', deleteSupply);
router.delete('/delete-company', deleteCompany);
router.delete('/give-back-supply', giveBackSupply);
router.delete('/logout', logOutController);
router.delete('/delete-user', deleteUser);

export default router;
