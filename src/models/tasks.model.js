const { Schema, model } = require('mongoose');

const _taskSchema = new Schema({
    task: String,
    description: String
});

module.exports = model('Task', _taskSchema);