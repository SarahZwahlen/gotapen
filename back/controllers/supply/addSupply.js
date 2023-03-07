import Supply from '../../models/supply.js'
import formidable from 'formidable'
import fs from 'fs'

const addSupply = async (req, res) => {
    try {
        const from = formidable()

        from.parse(req, async(error, fields, files) => {
            const newFileName = `${files.image.newFilename}${files.image.originalFilename}`
            fs.copyFile(`${files.image.filepath}`, `public/suppliesImages/${newFileName}`, () => console.log("add a file !"))
            const newSupply = new Supply({
                ...fields,
                //Change to user session id when done
                 imagePath : `/suppliesImages/${newFileName}`
            })
            await newSupply.save()
            res.json({
                body : req.body,
                message : "add a supply !"
            })
        })
    } catch (error) {
        console.log(error)
        res.json({
            message : "An error occured, pleasy retry"
        })
    } 
}

export default addSupply