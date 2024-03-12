const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Pinia-Tasks", "postgres", "admin@04", {
  host: "localhost",
  logging: false,
  dialect:
    "postgres" /* one of 'mysql' | 'sqlite' | 'postgres' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.task = require("./taskModel")(sequelize, DataTypes);

const check = async () => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
    db.sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


module.exports = { db, check };
