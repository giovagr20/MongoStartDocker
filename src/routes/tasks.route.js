const express = require('express');
const routes = express.Router();
const _taskSchema = require('../models/tasks.model');

routes.get('/', (req, res) => {
    res.render('index');
});

routes.post('/createTask', (req, res) => {
    const tasks = {
        task: req.body.task,
        description: req.body.description
    };
    const taskSchema = new _taskSchema(tasks);
    taskSchema.save();
})

module.exports = routes;