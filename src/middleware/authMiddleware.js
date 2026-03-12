import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }

};
