const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Access denied" });
    }

    const token = authHeader.split(" ")[1]; // Bearer token
    const verified = jwt.verify(token, process.env.JWT_SECRETS);

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
