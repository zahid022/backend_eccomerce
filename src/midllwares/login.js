const supabase = require("../supabase");

async function loginFunction(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized: No token provided" })
        }
        
        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Malformed token' });
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        if(data.user.app_metadata.role !== "admin"){
            return res.status(401).json({error : 'You are not an ADMIN'})
        }

        next()

    } catch (err) {
        console.log("Token verification error:", err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

module.exports = loginFunction