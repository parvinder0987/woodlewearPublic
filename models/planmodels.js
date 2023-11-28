// planmodels.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Plan = sequelize.define('Plan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Plan;
