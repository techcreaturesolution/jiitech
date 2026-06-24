import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    if (email === adminEmail && password === adminPassword) {
      // Generate JWT
      const token = jwt.sign(
        { role: 'admin', email: adminEmail },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        success: true,
        token,
        msg: 'Login successful'
      });
    } else {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};
