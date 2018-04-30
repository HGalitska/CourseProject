var mongoose = require("mongoose");

var submittedTaskSchema = new mongoose.Schema({
    task_id       : { type: mongoose.Schema.ObjectId, ref: "Task" },
    student_id    : { type: mongoose.Schema.ObjectId, ref: "User" },
    date          : Date,
    mark          : Number,
    docs          : [{ type: mongoose.Schema.ObjectId, ref: "Document" }]
});

module.exports = mongoose.model('SubmittedTask', completedTaskSchema);
