const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'miscellaneous',
  },
});

module.exports = Expense;
