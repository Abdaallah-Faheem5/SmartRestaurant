const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users, getNextUserId } = require('../data/mockData');

const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
        });
      }

      
      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }

      
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'الحساب غير مفعل'
        });
      }

      
      const isMatch = password === user.password;
      
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }

      
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء تسجيل الدخول',
        error: error.message
      });
    }
  }

  // Register
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, phone } = req.body;


      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          message: 'جميع الحقول مطلوبة'
        });
      }

      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'البريد الإلكتروني مسجل مسبقاً'
        });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

      
      const newUser = {
        id: getNextUserId(),
        email,
        password: hashedPassword,
        role: 'customer',
        firstName,
        lastName,
        phone: phone || null,
        isActive: true,
        createdAt: new Date()
      };

      users.push(newUser);

      
      const token = jwt.sign(
        { 
          id: newUser.id, 
          email: newUser.email, 
          role: newUser.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء إنشاء الحساب',
        error: error.message
      });
    }
  }

  // Get current user
  async getMe(req, res) {
    try {
      const user = users.find(u => u.id === req.user.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
      }

      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: userWithoutPassword
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      res.json({
        success: true,
        message: 'تم تسجيل الخروج بنجاح'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }
}

module.exports = new AuthController();