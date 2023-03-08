import express from 'express'
import createAccount from '../controllers/user/createAccount.js'
import addSupply from '../controllers/supply/addSupply.js'
import deleteSupply from '../controllers/supply/deteletSupply.js'
import modifySupply from '../controllers/supply/modifySupply.js'
import showSupplies from '../controllers/supply/showSupplies.js'
import createCompany from '../controllers/company/createCompany.js'
import joinCompany from '../controllers/company/joinCompany.js'
import deleteCompany from '../controllers/company/deleteCompany.js'
import askForSupply from '../controllers/user/askForSupply.js'
import showSharingRequest from '../controllers/user/showSharingRequests.js'

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