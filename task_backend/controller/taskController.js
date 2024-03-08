const { db } = require("../model/connection");
const Task = db.Task;
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

// -------- CREATE NEW TASKS ---------------
exports.createTask = asyncErrorHandler(async (req, res, next) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({ 
    status: "success",
    tasks: newTask,
  });
});

// ---------- FIND ALL PRODUCTS ----------
exports.getAllTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll();
  res.status(200).json({
    status: "success",
    count: tasks.length,
    tasks: {
      tasks,
    },
  });
});

// ---------------------- FIND ALL FAVOURITE TASKS --------------------

exports.getAllFavTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {
      isFav: true,
    },
  });
  res.status(200).json({
    status: "success",
    count: tasks.length,
    tasks: {
      tasks,
    },
  });
});

// ------------ GET A SPECIFIC TASK--------
exports.getAtask = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (!task) {
    const error = new CustomError("task not found!", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    tasks: {
      task,
    },
  });
});

// ----------- DELETE A TASK --------------
exports.deleteTask = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (!task) {
    const error = new CustomError("task not found!", 404);
    return next(error);
  }
  await Task.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "success",
  });
});

// -------- UPDATE TASK -------------
exports.updateTask = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (!task) {
    const error = new CustomError("task not found!", 404);
    return next(error);
  }
  const updatedTask = await Task.update(req.body, {
    where: { id },
    returning: true,
  });
  console.log(updatedTask);
  res.status(200).json({
    status: "success",
    tasks: {
      updatedTask,
    },
  });
});