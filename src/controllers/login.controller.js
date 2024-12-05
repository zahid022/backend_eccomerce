const loginService = require("../services/login.service");

const signUp = async (req, res) => {
    const { body } = req

    try {
        let data = await loginService.signUp(body)
        if(!data.user.app_metadata.role){
            data.user.app_metadata.role = "user"
        }
        res.json({ token: data.session.access_token, role : data.user.app_metadata.role })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const signin = async (req, res) => {
    const { body } = req

    try {
        let data = await loginService.signin(body)
        if(!data.user.app_metadata.role){
            data.user.app_metadata.role = "user"
        }
        res.json({ token: data.session.access_token, role : data.user.app_metadata.role })
    } catch (err) {
        res.status(400).json({error : err.message})
    }
}

const signOut = async (req, res) => {
    try {
        await loginService.signOut()
        res.json({message : "User is sign out successfully"})
    } catch (err) {
        res.status(400).json({error : err.message})
    }
};

const loginController = {
    signUp,
    signin,
    signOut
}

module.exports = loginController