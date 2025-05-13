const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

            //Directly assign role from token (No DB Query)
            req.user = { id: decoded.id, role: decoded.role };

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
