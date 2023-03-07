import Supply from "../../models/supply.js";

const showSupplies = async (req, res) => {
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