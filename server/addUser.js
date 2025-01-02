const sequelize = require('../config/sequelize');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function addUsers() {
  try {
    await sequelize.sync(); // Ensure the database is in sync

    // Check if the user already exists
    const user1 = await User.findOne({ where: { username: 'user1' } });
    if (!user1) {
      const hashedPassword = await bcrypt.hash('user1password', 10); // Hash the password
      await User.create({
        username: 'user1',
        password: hashedPassword,
        role: 'user',
      });
      console.log('User1 added successfully');
    } else {
      console.log('User1 already exists');
    }

    // Check if the admin already exists
    const admin1 = await User.findOne({ where: { username: 'admin1' } });
    if (!admin1) {
      const hashedPassword = await bcrypt.hash('admin1password', 10); // Hash the password
      await User.create({
        username: 'admin1',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin1 added successfully');
    } else {
      console.log('Admin1 already exists');
    }

  } catch (error) {
    console.error('Error adding users:', error);
  } finally {
    await sequelize.close();
  }
}

addUsers();