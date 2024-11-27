const brandService = require("../services/brand.service");

const allBrand = async (req, res) => {
    let data = await brandService.allBrand()

    res.json(data)
}

const byIdBrand = async (req, res) => {
    const { id } = req.params

    try {
        let data = await brandService.byIdBrand(id)
        res.json(data)
    } catch {
        res.status(404).json({ error: "Brand not found" })
    }

}

const createBrand = async (req, res) => {
    const { body } = req;

    try {
        const newData = await brandService.createBrand(body);

        res.json({ message: "Brand created successfully", data: newData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteBrand = async (req, res) => {
    const { id } = req.params

    try {
        await brandService.byIdBrand(id)
    } catch {
        return res.status(404).json({ error: "Brand not found" })
    }

    try {
        await brandService.deleteBrand(id)
        res.json({ message: "brand deleted is successfully" });
    } catch (err) {
        res.status(500).json({error : err.message})
    }

}

const replaceBrand = async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        await brandService.byIdBrand(id)
    } catch {
        return res.status(404).json({ error: "Brand not found" })
    }

    try {
        const result = await brandService.replaceBrand(body, id)
        res.json({message : "Brand updated successfully", data : result})
    } catch (err) {
        res.status(500).json({error : err.message})
    }
}

const brandController = {
    allBrand,
    byIdBrand,
    createBrand,
    deleteBrand,
    replaceBrand
}

module.exports = brandController