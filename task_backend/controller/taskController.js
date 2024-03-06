const { db } = require("../model/connection");
const Task = db.Task;
const asyncErrorHandler = require("../utils/asyncErrorHandler");

// -------- CREATE NEW TASKS ---------------
exports.createTask = asyncErrorHandler(async (req, res,next) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    tasks: newTask,
  });
});


// ---------- FIND ALL PRODUCTS ----------
exports.getAllTasks = asyncErrorHandler(async(req,res,next)=>{
    const tasks = await Task.findAll();
    res.status(200).json({
        status:"success",
        count:tasks.length,
        tasks:{
            tasks
        }
    })
})
