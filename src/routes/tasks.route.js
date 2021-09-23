const express = require("express");
const routes = express.Router();
const _taskSchema = require("../models/tasks.model");

const type = require("../utils/type");

routes.get("/", async (req, res) => {
  type.active = true;
  let tasks = await _taskSchema.find();
  res.render("index", { tasks });
});

routes.post("/createTask", async (req, res) => {
  const tasks = {
    task: req.body.task,
    description: req.body.description,
    statusEdit: false,
    status: false
  };

  console.log(tasks);
  const taskSchema = new _taskSchema(tasks);
  await taskSchema.save();

  res.redirect("/");
});

routes.get("/deleteTask/:id", async (req, res) => {
  if (!req.params.id) {
    alert("No existe id");
    return;
  }
  await _taskSchema.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

routes.get("/editTask/:id", async (req, res) => {
  if (!req.params.id) {
    alert("No hay id");
    return;
  }

  let id = req.params.id;

  let response = await _taskSchema.findById(id);
  res.render("edit", { id, response });
});

routes.post("/editTask/:id", async (req, res) => {
  let response = await _taskSchema.findById(req.params.id);

  response.task = req.body.task;
  response.description = req.body.description;
  response.statusEdit = true;
  response.status = false;

  const taskSchema = new _taskSchema(response);
  
  await taskSchema.save();

  res.redirect("/");
});


routes.get('/doTask/:id/', async (req, res) => {
  let response = await _taskSchema.findById(req.params.id);
  
  response.status = !response.status;
  const schema = new _taskSchema(response);

  await schema.save();
  res.redirect('/');
})

module.exports = routes;
