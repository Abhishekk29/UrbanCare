const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

<<<<<<< HEAD
<<<<<<< HEAD
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Missing token' });
=======
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
>>>>>>> origin/main
=======
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }
>>>>>>> dc19d15570d564917d31f08b6a31bd7f203e5058

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
<<<<<<< HEAD
    req.user = decoded;
    next();
  } catch {
=======
=======
>>>>>>> dc19d15570d564917d31f08b6a31bd7f203e5058
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (err) {
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> dc19d15570d564917d31f08b6a31bd7f203e5058
    return res.status(403).json({ message: 'Invalid token' });
  }
};
