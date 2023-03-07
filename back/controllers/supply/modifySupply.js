import Supply from "../../models/supply.js"
import formidable from "formidable"
import fs from 'fs'

const modifySupply = (req, res) => {

    try {
        const form = formidable()
        
        form.parse(req, async (error, fields, files) => {
            const fileToUpdate = await Supply.findOne({_id : fields.id})
            
            console.log(fields)
            if(files.image){
                const newFileName = files.image.newFilename + files.image.originalFilename
                fs.unlink(`public/${fileToUpdate.imagePath}`, () => console.log('Image is deleted'))
                fs.copyFile(`${files.image.filepath}`, `public/suppliesImages/${newFileName}`, () => console.log("add a file !"))
                await Supply.updateOne({_id:fields.id}, {imagePath : `suppliesImages/${newFileName}`})
            }
            if(fields){
                await Supply.updateOne({_id:fields.id}, {...fields})
            }
            res.json({
                message : "Supply modified"
            })
        })
    } catch (error){
        console.log(error)
        res.json({
            message : 'An error occured'
        })
    }
}

export default modifySupply