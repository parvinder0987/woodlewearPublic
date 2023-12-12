const { DataTypes } = require('sequelize');
const sequelize = require("../db/dbConfig");

const user = sequelize.define("user", {
  Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yourEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,

  },
  phoneNumber: {
    type: DataTypes.STRING,

  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,

  },

  role: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },

  OTP: {
    type: DataTypes.STRING,
  },
  is_otp_verify: {
    type: DataTypes.INTEGER,
  }, Gender: {
    type: DataTypes.STRING,
    enum: ["Male", "Female"],

  },
  DOB: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  about: {
    type: DataTypes.TEXT,
  }, image: {
    type: DataTypes.STRING,
  },
  education: {
    type: DataTypes.STRING,
  },
  stream: {
    type: DataTypes.STRING,
  },
  employeType: {
    type: DataTypes.INTEGER,
    enum: [1, 2], // 1 = full time , 2 = part time
    defaultValue: 1
  },
  document: {
    type: DataTypes.STRING,
  },
  experience: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  skills: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  idproof: {
    type: DataTypes.STRING,
    enum: [0, 1, 2, 3],
  },
  uploadproof: {
    type: DataTypes.STRING,
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

user.sync();

module.exports = user;
