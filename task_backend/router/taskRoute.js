const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.post('/tasks/create',taskController.createTask);
router.get('/tasks',taskController.getAllTasks);



module.exports = router;