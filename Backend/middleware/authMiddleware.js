const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ error: "access denied" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRETS);

        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({error:"invalid token"});
    }

};

module.exports=verifyToken;