const jwt = require('jsonwebtoken');
const { users } = require('../data/mockData');

const JWT_SECRET = process.env.JWT_SECRET ;

const authenticate = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح - الرجاء تسجيل الدخول'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user exists
    const user = users.find(u => u.id === decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح - المستخدم غير موجود أو غير مفعل'
      });
    }

    // Attach user to request
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'غير مصرح - توكن غير صالح',
      error: error.message
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح - ليس لديك صلاحية للوصول'
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };