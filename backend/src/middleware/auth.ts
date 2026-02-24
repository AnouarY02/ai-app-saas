import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Niet geautoriseerd" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Niet geautoriseerd" });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as any;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Toegang geweigerd: alleen beheerders" });
  }
  next();
}
