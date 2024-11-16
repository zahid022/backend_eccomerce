const supabase = require("../supabase")

const getUser = async (req) => {
    const auth = req.headers.authorization
    const token = auth.split(" ")[1]

    const {data, error} = await supabase.auth.getUser(token)
    
    if(error) return false
    
    return data
}

module.exports = getUser