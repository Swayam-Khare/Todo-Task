const { db } = require("../models/connection");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const Task = db.task;

//      ### FETCH ALL TASKS ###

const getAllTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll({});

  res.status(200).json({
    status: "Success",
    count: tasks.length,
    tasks,
  });
});

//      ### FETCH ALL FAV TASKS ###

const getFavoriteTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {
      isFav: true,
    },
  });

  res.status(200).json({
    status: "Success",
    count: tasks.length,
    tasks,
  });
});

//      ### FETCH ALL COMPLETED TASKS ###

const getCompletedTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {
      isCompleted: true,
    },
  });

  res.status(200).json({
    status: "Success",
    count: tasks.length,
    tasks,
  });
});

//      ### FETCH ALL INCOMPLETE TASKS ###
const getIncompleteTasks = asyncErrorHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {
      isCompleted: false,
    },
  });

  res.status(200).json({
    status: "Success",
    count: tasks.length,
    tasks,
  });
});

//      ### CREATE NEW TASK ###

const addTask = asyncErrorHandler(async (req, res, next) => {
  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: "Success",
    data: newTask,
  });
});

//      ### FETCH A SINGLE TASK ###

const getTask = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return next(new CustomError("Task not found!", 404));
  }

  res.status(200).json({
    status: "Success",
    task,
  });
});

//      ### UPDATE TASK ###

const updateTask = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return next(new CustomError("Task not found!", 404));
  }
  
  const updatedTask = await Task.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  });

  res.status(200).json({
    status: "Success",
    data: updatedTask,
  });
});

//      ### DELETE TASK ###

const deleteTask = asyncErrorHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return next(new CustomError("Task not found!", 404));
  }

  await Task.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).json({
    status: "Success",
  });
});

module.exports = {
  getAllTasks,
  getFavoriteTasks,
  getCompletedTasks,
  getIncompleteTasks,
  addTask,

  getTask,
  updateTask,
  deleteTask,
};
