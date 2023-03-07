import Company from "../../models/company.js";
import User from '../../models/user.js'
import bcrypt from 'bcrypt'

const joinCompany = async(req, res) => {
    const user = await User.findOne({_id:req.body.userId})
    const company = await Company.findOne({_id:req.body.companyId}) 

    bcrypt.compare(req.body.joinCode, company.joinCode, async (error, result) => {
        if(result === true){
            await User.updateOne({_id:req.body.userId}, {company : company})
            await Company.updateOne({_id:req.body.companyId}, {employees : user})
            res.json({
                message : "try to join company"
            })
        } else {
            res.json({
                message : "Join company failed"
            })
        }
    })
}

export default joinCompany