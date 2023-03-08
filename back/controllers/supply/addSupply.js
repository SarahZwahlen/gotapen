import Supply from '../../models/supply.js'
import User from '../../models/user.js'
import formidable from 'formidable'
import fs from 'fs'

const addSupply = async (req, res) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {
        const from = formidable()

        from.parse(req, async(error, fields, files) => {
            const newFileName = `${files.image.newFilename}${files.image.originalFilename}`
            fs.copyFile(`${files.image.filepath}`, `public/suppliesImages/${newFileName}`, () => console.log("add a file !"))
            const newSupply = new Supply({
                ...fields,
                 imagePath : `/suppliesImages/${newFileName}`
            })
            await newSupply.save()

            await User.updateOne({_id : fields.owner}, {supplies : newSupply})
               res.json({
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