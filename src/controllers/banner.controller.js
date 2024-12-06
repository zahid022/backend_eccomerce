const bannerService = require("../services/banner.service")

const getTile = async (req, res) => {
    try {
        const result = await bannerService.getTile()
        res.json(result)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const createTile = async (req, res) => {
    try {
        const result = await bannerService.createTile(req.body)
        res.json({
            message: "Tile is created successfully",
            data: result
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const deletetile = async (req, res) => {
    const { id } = req.params

    try {
        await bannerService.deleteTile(id)
        res.json({message : "Tile is deleted successfully"})
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const getTrend = async (req, res) => {
    try {
        let data = await bannerService.getTrend()
        res.json(data)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const createTrend = async (req, res) => {
    try {
        let data = await bannerService.createTrend(req.body)
        res.json(data)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const deleteTrend = async (req, res) => {
    try {
        await bannerService.deleteTrend(req.params.id)
        res.json({message : "Trend is deleted successfully"})
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const bannerController = {
    getTile,
    createTile,
    deletetile,
    getTrend,
    createTrend,
    deleteTrend
}

module.exports = bannerController