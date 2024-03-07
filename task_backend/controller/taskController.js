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

// ---------------DELETE  TASK---------------------------
exports.deleteTasks = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    const error = new CustomError("Task with that id is not found", 404);
    return next(error);
  }

  await Task.destroy({
    where: { id: req.params.id },
  });

  res.status(204).json({
    status: "success",
    message: "Task deleted successfully",
  });
});
