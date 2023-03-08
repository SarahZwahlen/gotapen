import User from "../../models/user"
import Supply from "../../models/supply"
import Express from 'express'


const askForSupply = async(req: Express.Request, res: Express.Response) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    const applicant = await User.findOne({_id: req.body.applicantId})
    const sharer = await User.findOne({_id: req.body.sharerId})
    const sharedSupply = await Supply.findOne({_id: req.body.sharedSupplyId})

    console.log(applicant, sharer, sharedSupply)

    await User.updateOne({_id:req.body.sharerId}, {sharingRequests : {
        applicant : req.body.applicantId,
        askedSupply : req.body.sharedSupplyId
    }})

    // Ajouter dans les notifications du prêteur qu'il a une demande venant de tel personne pour tel object
    // Ajouter dans le schema user "sharing request" : contient l'ID du demandeur et l'ID de l'objet demandé

res.json({
    message : 'somebody is asking for a supply'
})

}

export default askForSupply