import Supply from "../../models/supply.js";

const showSupplies = async (req, res) => {
    // Attention a reparamétrer avec les données de sessions quand celle-ci sera fonctionnelle

    try {

        const supplies = await Supply.find({})
        res.json({
            message : "Here are the supplies",
            supplies : supplies
        })
    } catch (error){
        console.log(error)
        res.json({
            message : "An error occured"
        })
    }
}

export default showSupplies