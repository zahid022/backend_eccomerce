const commentService = require("../services/comment.service");
const getUser = require("../utils/user.get");

const getComment = async (req, res) => {
    const { id } = req.params

    try {
        let data = await commentService.getComment(id)

        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const createComment = async (req, res) => {
    let user = null
    try {
        user = await getUser(req)
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    const { id } = req.params
    const { content } = req.body

    try {
        let result = await commentService.createComment(id, user.user.id, content)

        res.json({ message: "comment created successfully", result })
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const deleteComment = async (req, res) => {
    let user = null
    try {
        user = await getUser(req)
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    const { id } = req.params

    try {
        await commentService.deleteComment(id, user.user.id)
        
        res.json({ message: "comment deleted successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const commentController = {
    getComment,
    createComment,
    deleteComment
}

module.exports = commentController