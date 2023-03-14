import Express from 'express';
import supplyRepository from '../../repositories/supply.respository';

const addSupply = async (req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {
        const supplyDatas = req.body;
        // Warning currently session system is not designed ...
        const owner = req.session.user;
        if (!owner) {
            return res.status(401).json({
                message: 'User is not authentified'
            });
        }
        const fileName = req.file?.filename;
        if (!fileName) {
            return res.status(401).json({
                message: 'A file is missing'
            });
        }

        supplyRepository.addSupply(owner, supplyDatas, fileName);

        res.json({
            message: 'add a supply !',
            isShared: true
        });
    } catch (error) {
        res.json({
            message: 'An error occured, pleasy retry',
            error: error
        });
    }
};

export default addSupply;
