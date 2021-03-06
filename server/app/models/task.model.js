var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    title         : String,
    description   : String,
    deadline      : Date,
    docs          : [{ type: mongoose.Schema.ObjectId }],
    maxMark       : Number
});

module.exports = mongoose.model('Task', taskSchema);
