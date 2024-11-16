const { allComment, addComment, removeComment } = require("../services/comment.service");
const supabase = require("../supabase");
const getUser = require("../utils/user.get");

const getComment = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) return res.status(404).json({ error: "id is invalid" })

    let result = await allComment(id)

    if (!result) return res.status(500).json({ error: "server error" })

    res.json(result)
}

const createComment = async (req, res) => {
    const user = await getUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params
    const {content} = req.body

    if(!content || content.toString().trim().length === 0) return res.status(401).json({error : "content is required"})

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) return res.status(404).json({ error: "id is invalid" })

    let result = await addComment(id, user.user.id, content)

    if(!result) return res.status(500).json({error : "server error"})

    res.json({message : "comment created successfully", result})
}

const deleteComment = async (req, res) => {
    const user = await getUser(req)

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params

    const {data, error} = await supabase.from("comments").select("*").eq("id", id).single()

    if(error) return res.status(404).json({error : "id is invalid"})

    let result = await removeComment(id, user.user.id)
    
    if(!result) return res.status(500).json({error : "server error"})
    
    res.json({message : "comment deleted successfully"})
}

module.exports = {
    getComment,
    createComment,
    deleteComment
}