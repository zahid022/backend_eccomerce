const { register, login } = require("../services/login.service");
const supabase = require("../supabase");

const signUp = async (req, res) => {
    const { email, password } = req.body

    if (!email || email.toString().trim().length === 0 || !password || password.toString().trim().length === 0) return res.status(401).json({ error: "email and password are required" })

    let data = await register({ email, password })

    if (!data) return res.status(500).json({ error: data })

    res.json({ token: data.session.access_token })
}

const signin = async (req, res) => {
    const { email, password } = req.body

    if (!email || email.toString().trim().length === 0 || !password || password.toString().trim().length === 0) return res.status(401).json({ error: "email and password are required" })

    let data = await login({ email, password })

    if (!data) return res.status(500).json({ error: data })

    res.json({ token: data.session.access_token })
}

const signOut = async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: "User signed out successfully" });
};

module.exports = {
    signUp,
    signin,
    signOut
}