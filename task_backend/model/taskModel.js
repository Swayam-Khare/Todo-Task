module.exports = (sequelize, Datatypes) => {
  const Task = sequelize.define("Tasks", {
    title: {
      type: Datatypes.STRING,
      allowNULL: false,
    },
    description: {
      type: Datatypes.STRING,
      allowNULL: false,
    },
    isFav: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
  },{
    timestamps: false
  });
  return Task;
};
