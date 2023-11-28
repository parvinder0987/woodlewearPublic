const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConfig');
const category = require("./categorymodels")
const subcategory = require("./subcategorymodels")

const AddContent = sequelize.define('addcontent',{
  content_type: {
    type: DataTypes.STRING,
    enum:["audio","video"],
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: category,
      key: 'id',
    },
  },
  subcategoryId: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: subcategory,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  file: {                                                                                                                   
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {

});
AddContent.sync(); 
module.exports = AddContent;
