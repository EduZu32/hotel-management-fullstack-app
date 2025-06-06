const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]) ||
    req.query.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "claveUltraSecreta"
    );
    req.user = decoded; // ahora puedes acceder a req.user en las rutas
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
