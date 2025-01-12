const sequelize = require('./config/sequelize');
const User = require('./models/user');

async function addUsers() {
  try {
    await sequelize.sync(); // Ensure the database is in sync

    // Add a regular user
    await User.create({
      username: 'user',
      password: 'userpass', // In a real app, hash the password before storing
      role: 'user',
    });

    // Add an admin user
    await User.create({
      username: 'admin',
      password: 'adminpass', // In a real app, hash the password before storing
      role: 'admin',
    });

    console.log('Users added successfully');
  } catch (error) {
    console.error('Error adding users:', error);
  } finally {
    await sequelize.close();
  }
}

addUsers();