const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

router.post("/tasks/create", taskController.createTask);
router.get("/tasks", taskController.getAllTasks);
router.delete("/tasks/:id", taskController.deleteTasks);

module.exports = router;
