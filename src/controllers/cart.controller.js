const { cartAll, cartCreate, cartRemove } = require("../services/cart.service")
const getUser = require("../utils/user.get")

const cartGet = async (req, res) => {
    const user = await getUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const newData = await cartAll(user)

    if (!newData) return res.status(500).json({ error: "server error" })

    res.json(newData)

}

const cartAdd = async (req, res) => {
    const user = await getUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { productId, quantity } = req.body

    const newData = await cartCreate(user, productId, quantity)

    if (!newData) return res.status(500).json({ error: "server error" })

    res.json(newData)
}

const cartDelete = async (req, res) => {
    const user = await getUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params

    const newData = await cartAll(user)

    if (!newData) return res.status(500).json({ error: "server error" })

    const obj = newData.filter(item => +item.id === +id)

    if(!obj) return res.status(401).json({error : "id is invalid"})

    const text = await cartRemove(id, user)

    if(!text) return res.status(500).json({error : "server error"})

    res.json({message : "product is deleted successfully"})
}

module.exports = {
    cartGet,
    cartAdd,
    cartDelete
}