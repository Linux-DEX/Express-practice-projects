const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authenticaton");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}

module.exports = verifyToken;