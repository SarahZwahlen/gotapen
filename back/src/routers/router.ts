import express from 'express'
import createAccount from '../controllers/user/createAccount'
import addSupply from '../controllers/supply/addSupply'
import deleteSupply from '../controllers/supply/deleteSupply'
import modifySupply from '../controllers/supply/modifySupply'
import showSupplies from '../controllers/supply/showSupplies'
import createCompany from '../controllers/company/createCompany'
import joinCompany from '../controllers/company/joinCompany'
import deleteCompany from '../controllers/company/deleteCompany'
import askForSupply from '../controllers/user/askForSupply'
import showSharingRequest from '../controllers/user/showSharingRequests'

const router = express.Router()

router.get('/show-supplies', showSupplies)

router.post('/create-account', createAccount)
router.post('/add-supply', addSupply)
router.post('/modify-supply', modifySupply)
router.post('/create-company', createCompany)
router.post('/join-company',joinCompany)
router.post('/ask-for-supply', askForSupply)
router.post('/show-sharing-requests', showSharingRequest)

router.delete('/delete-supply', deleteSupply)
router.delete('/delete-company', deleteCompany)
 

export default router