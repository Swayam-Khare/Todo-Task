module.exports = (sequelize, Datatypes) => {
  const Task = sequelize.define(
    "Task",
    {
      // Model attributes are defined here
      title: Datatypes.STRING,
      isFav: {
        type: Datatypes.BOOLEAN,
        defaultValue: false,
      },
      isCompleted: {
        type: Datatypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      // Other model options go here
      tableName: "Task",
      timestamps: false,
    }
  );
  // `sequelize.define` also returns the model

  return Task;
};
