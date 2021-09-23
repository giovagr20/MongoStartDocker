const { Schema, model } = require('mongoose');

const _taskSchema = new Schema({
    task: String,
    description: String,
    statusEdit: Boolean,
    status: Boolean
});

module.exports = model('Task', _taskSchema);