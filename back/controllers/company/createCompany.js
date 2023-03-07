import Company from '../../models/company.js'
import bcrypt from 'bcrypt'

const createCompany = async (req, res) => {

    try {
        const hashedJoinCode = await bcrypt.hash(req.body.joinCode, 10)

        const newCompany = new Company({
            ...req.body,
            joinCode : hashedJoinCode,
        })
        await newCompany.save()
        res.json({
            message : "company created"
        })
    } catch (error){
        if(error.code === 11000) {
            res.json({
                message : "Company name already exists"
            })
        } else {
            res.json({
                message : "An error occured"
            })
        }
    }
}

export default createCompany