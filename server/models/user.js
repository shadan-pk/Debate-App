// filepath: /e:/Github/DA/git/debate-app/Debate-App/server/models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['admin', 'user']],
    },
  },
}, {
  tableName: 'users', // Specify the table name
  timestamps: false, // Disable automatic timestamps
});

module.exports = User;