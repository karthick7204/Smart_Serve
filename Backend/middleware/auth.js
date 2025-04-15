const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: "Token required" });

    try {
        const decoded = jwt.verify(token.split(' ')[1], "SECRET");
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;
