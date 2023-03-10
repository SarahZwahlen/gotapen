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
import multer from 'multer';
import loginController from '../controllers/user/login';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/suppliesImages');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage: storage, preservePath: true });

const router = express.Router();

router.get('/show-supplies', showSupplies);
router.get('/show-received-sharing-requests', showReceivedSharingRequest);
router.get('/show-sent-sharing-requests', showSentSharingRequests);

router.post('/create-account', createAccount);
router.post('/login', loginController);
router.post('/add-supply', upload.single('image'), addSupply);
router.post('/modify-supply', upload.single('image'), modifySupply);
router.post('/create-company', createCompany);
router.post('/join-company', joinCompany);
router.post('/send-sharing-request', sendSharingRequest);
router.post('/accept-sharing', acceptSharing);
router.post('/denied-sharing', deniedSharing);

router.delete('/delete-supply', deleteSupply);
router.delete('/delete-company', deleteCompany);
router.delete('/give-back-supply', giveBackSupply);

export default router;
