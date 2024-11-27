const cartService = require("../services/cart.service")
const getUser = require("../utils/user.get")

const cartGet = async (req, res) => {
    let user = null
    try {
        user = await getUser(req)
    } catch (err) {
        return res.status(401).json({ error: err.message })
    }

    try {
        const data = await cartService.cartGet(user.user.id)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const cartAdd = async (req, res) => {
    let user = null
    try {
        user = await getUser(req)
    } catch (err) {
        return res.status(401).json({ error: err.message })
    }
    const { body } = req

    try {
        const data = await cartService.cartAdd(user.user.id, body.product_id, body.count)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const cartDelete = async (req, res) => {
    let user = null
    try {
        user = await getUser(req)
    } catch (err) {
        return res.status(401).json({ error: err.message })
    }

    const { id } = req.params

    try {
        await cartService.cartDelete(id, user.user.id)
    
        res.json({ message: "product is deleted successfully" })
    } catch (err) {
        res.status(400).json({error : err.message})
    }
}

const cartController = {
    cartGet,
    cartAdd,
    cartDelete
}

module.exports = cartController