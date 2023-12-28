const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('student', 'dbuser', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
 


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();

module.exports = sequelize;

