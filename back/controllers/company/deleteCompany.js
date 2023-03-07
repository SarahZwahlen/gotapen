import Company from "../../models/company.js";

const deleteCompany = async (req, res) => {
    try {
        await Company.deleteOne({_id : req.body.id})
        res.json({
            message : "Company deleted"
        })
    } catch (error){
        console.log(error)
        res.json({
            message : "An error occured"
        })
    }

}

export default deleteCompany