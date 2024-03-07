const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.post('/tasks/create',taskController.createTask);
router.get('/tasks',taskController.getAllTasks);
router.get('/tasks/favourite',taskController.getAllFavTasks);
router.route('/tasks/:id')
.get(taskController.getAtask)
.delete(taskController.deleteTask)
.patch(taskController.updateTask);




module.exports = router;