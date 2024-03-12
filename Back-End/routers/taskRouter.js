const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/all-tasks", taskController.getAllTasks);
router.get("/favorite-tasks", taskController.getFavoriteTasks);
router.get("/completed-tasks", taskController.getCompletedTasks);
router.get("/incomplete-tasks", taskController.getIncompleteTasks);
router.post("/add-task", taskController.addTask);

router.route("/tasks/:id")
.get(taskController.getTask)
.patch(taskController.updateTask)
.delete(taskController.deleteTask);

module.exports = router;
