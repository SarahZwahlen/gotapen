import Supply from "../../models/supply.js";
import fs from 'fs'

const deleteSupply = async (req, res) => {
    try {

        const supplyToDelete = await Supply.findOne({_id:req.body.id})
        console.log(supplyToDelete)
        
        fs.unlink(`public/${supplyToDelete.imagePath}`, () => console.log('pic deleted'))
        await Supply.deleteOne({_id:req.body.id})
        res.json({
            message : "try to delete a supply"
        })
    } catch (error) {
        res.json({
            message : "An error occured"
        })
    }
}

export default deleteSupply