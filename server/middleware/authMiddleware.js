const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

<<<<<<< HEAD
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Missing token' });
=======
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
>>>>>>> origin/main

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
    req.user = decoded;
    next();
  } catch {
=======
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
>>>>>>> origin/main
    return res.status(403).json({ message: 'Invalid token' });
  }
};
