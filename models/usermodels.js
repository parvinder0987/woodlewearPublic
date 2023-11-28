  const { DataTypes } = require('sequelize');
const sequelize = require("../db/dbConfig");

const User = sequelize.define("User", {
  Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yourEmail: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: false,    
    defaultValue: "", 
  },
  phoneNumber: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  
  role: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
  },
  
   OTP: {
    type: DataTypes.STRING,
  },
  is_otp_verify: {
    type: DataTypes.INTEGER,
    defaultValue:0,
  }, Gender: {
    type: DataTypes.STRING,
    enum: ["Male", "Female"],
    defaultValue: null, 
  },
  DOB: {
    type: DataTypes.DATEONLY,
    defaultValue: null,
    allowNull: true,
  },
  about: {
    type: DataTypes.TEXT,
    defaultValue:null
  },image	:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  education:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  stream:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  partime:{
    type:DataTypes.NUMBER,
    enum :[1],
    defaultValue:null
  },
  fulltime:{
    type:DataTypes.NUMBER,
    enum: [0],
    defaultValue:null
  },
  document:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  experience:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  description:{
   type:DataTypes.STRING,
   defaultValue:null
  },
  skills:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  address:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  idproof:{
    type:DataTypes.STRING,
    enum: [0, 1, 2, 3],
    defaultValue:null
  },
  uploadproof:{
    type:DataTypes.STRING,
    defaultValue:null
  },
  // usertype:{
  //   type:DataTypes.TINYINT,
  //   defaultValue:null
  // }
  // image	:{
  //   type:DataTypes.STRING,
  //   defaultValue:""
  // },
  // domains: [
  //   {
  //     type:DataTypes.STRING,
  //   },
  // ],





});

User.sync(); 

module.exports = User;
