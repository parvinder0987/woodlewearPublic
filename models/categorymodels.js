const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.sync(); 

module.exports = Category;
