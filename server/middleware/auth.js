import jwt from 'jsonwebtoken';

// Synchronized key to match the auth controller
const JWT_SECRET = process.env.JWT_SECRET || 'waste2build_super_secret_dev_key_2026';

// Evaluates the Authorization header and decodes the JWT
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Bind the decoded payload to the request lifecycle
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Curried function for Role-Based Access Control (RBAC)
export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: `Access denied. Requires ${role} role.` });
  }
  next();
};
