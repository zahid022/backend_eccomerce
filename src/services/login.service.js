const supabase = require("../supabase")

const signUp = async (obj) => {
    const { data, error } = await supabase.auth.signUp(obj)

    if (error) throw new Error(error.message);

    return data
}

const signin = async (obj) => {
    const { data, error } = await supabase.auth.signInWithPassword(obj)

    if (error) throw new Error(error.message);

    return data
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    return true
}

const loginService = {
    signUp,
    signin,
    signOut
}

module.exports = loginService