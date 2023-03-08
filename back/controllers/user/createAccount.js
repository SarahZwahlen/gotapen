import User from "../../models/user.js"

const createAccount = async (req, res) => {
    
    try {
        const newUser = new User({
            ...req.body
        })
        await newUser.save()
        res.json({
            message : 'account created',
        })
    } catch (error) {
        console.log(error)
        res.json({
            message : "An error occured, please retry. Maybe some required data is missing or this email is already used."
        })
        // Verify is user already exists
        // Datas are missing
    }
}

export default createAccount