import Supply from '../../models/supply';
import User from '../../models/user';
import fs from 'fs';
import Express from 'express';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {
        // const from = formidable();
        // from.parse(req, async(error, fields, files) => {
        //     const file = {
        //         newFilename: 'toto',
        //         originalFilename: 'dsds',
        //         filepath: 'dds'
        //     }
        //     const newFileName = `${file.newFilename}${file.originalFilename}`
        //     fs.copyFile(`${file.filepath}`, `public/suppliesImages/${newFileName}`, () => console.log("add a file !"))
        //     const newSupply = new Supply({
        //         ...fields,
        //          imagePath : `/suppliesImages/${newFileName}`
        //     })
        //     await newSupply.save()
        //     await User.updateOne({_id : fields.owner}, {supplies : newSupply})
        //        res.json({
        //         message : "add a supply !"
        //     })
        // })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured, pleasy retry',
        });
    }
};

export default addSupply;
