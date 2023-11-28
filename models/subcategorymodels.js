
const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const Plan = require('./planmodels');
const Category = require('./categorymodels'); 

const Subcategory = sequelize.define('Subcategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

Subcategory.sync()

// Subcategory.hasMany(Plan, { as: 'plans' });

module.exports = Subcategory;
