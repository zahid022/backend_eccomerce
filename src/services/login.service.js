const supabase = require("../supabase")

const register = async (obj) => {
    const { data, error } = await supabase.auth.signUp(obj)

    if (error) return error.message

    return data
}

const login = async (obj) => {
    const { data, error } = await supabase.auth.signInWithPassword(obj)

    if (error) return error.message

    return data
}

module.exports = {
    register,
    login
}