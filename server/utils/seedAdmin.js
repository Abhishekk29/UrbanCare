const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    const email = 'admin@gmail.com';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('✅ Admin already exists:', email);
      return;
    }

    const hashed = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Admin',
      email,
      password: hashed,
      role: 'admin'
    });

    console.log('✅ Admin created:', email, '/ admin123');
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
  }
}

module.exports = seedAdmin;
