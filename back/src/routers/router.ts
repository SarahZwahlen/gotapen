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
import getUserBorrowedSupplies from '../controllers/user/getUserBorrowedSupplies';
import showAllAvailableSupply from '../controllers/supply/showAllAvailableSupplies.controller';
import getEmployees from '../controllers/company/getEmployees.controller';

const router = express.Router();

router.get('/show-supplies', showCompanySupplies);
router.get('/show-received-sharing-requests', showReceivedSharingRequest);
router.get('/show-sent-sharing-requests', showSentSharingRequests);
router.get('/show-user-supplies', showUserSupplies);
router.get('/show-borrowed-supplies', getUserBorrowedSupplies);
router.get('/account', showUserDatas);
router.get('/company-available-supplies', showAllAvailableSupply);
router.get('/get-employees-list', getEmployees);

router.post('/create-account', createAccount);
router.post('/create-company-account', createCompany);
router.post('/login', loginController);
router.post('/add-supply', uploadMulterSingleFile, addSupply);
router.post('/show-supply', showSupply);
router.post('/join-company', joinCompany);
router.post('/send-sharing-request', sendSharingRequest);
router.post('/accept-sharing', acceptSharing);

router.put('/modify-user', updateUserDatas);
router.put('/modify-supply', uploadMulterSingleFile, modifySupply);

router.delete('/delete-supply', deleteSupply);
router.delete('/delete-company', deleteCompany);
router.delete('/give-back-supply', giveBackSupply);
router.delete('/logout', logOutController);
router.delete('/delete-user', deleteUser);
router.delete('/denied-sharing', deniedSharing);

export default router;
