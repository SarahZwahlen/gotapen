import Express from 'express';
import { executeAddSupplyUsecase } from '../../domain/usecases/addSupply/addSupply.usecase';
import { supplyRepository } from '../../infrastructure/repositories/supply/supplyRepository';
import { userRepository } from '../../infrastructure/repositories/user/userRepository';

const addSupplyUseCase = executeAddSupplyUsecase({
    supplyRepository: supplyRepository,
    userRepository: userRepository,
});

const addSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

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
    try {
        const response = await addSupplyUseCase({
            supply: {
                availability: req.body.availability,
                name: req.body.name,
                owner: req.body.owner,
            },
        });
        if (response?.message) {
            return res.status(500).json({
                message: response.message,
            });
        }

        return res.json();
    } catch (error) {
        console.log(error);
        res.json({
            message: 'An error occured, pleasy retry',
        });
    }
};

export default addSupply;
