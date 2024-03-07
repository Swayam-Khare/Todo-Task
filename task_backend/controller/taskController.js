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
  const id = req.params;

  await Task.destroy({
    where: id,
  });
  res.status(204).json({
    status: "success",
    message: "Task deleted successfully",
  });
});

// ---------------FIND TASK BY ID---------------------------

exports.getTaskById = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findOne({
    where: {
      id: req.params,
    }
  });

  if (!task) {
    const error = new CustomError("ID is invalid!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    tasks: {
      task
    }
  });
})

