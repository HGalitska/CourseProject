var mongoose = require("mongoose");

var submittedTaskSchema = new mongoose.Schema({
    task_id       : { type: mongoose.Schema.ObjectId},
    student_id    : { type: mongoose.Schema.ObjectId},
    date          : Date,
    mark          : Number,
    docs          : [{ type: mongoose.Schema.ObjectId}]
});

module.exports = mongoose.model('SubmittedTask', submittedTaskSchema);
