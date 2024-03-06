const { Sequelize, DataTypes } = require("sequelize");

const database = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Task = require("./taskModel")(sequelize, DataTypes);



const check = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await db.sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { db, check };
