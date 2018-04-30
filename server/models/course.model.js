var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    owner_id        : { type: mongoose.Schema.ObjectId, ref: "User" },
    name            : String,
    description     : String,
    lectures        : [{ type: mongoose.Schema.ObjectId, ref: "Lecture" }],
    tasks           : [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    members         : [{ type: mongoose.Schema.ObjectId, ref: "Group" }]
});

module.exports = mongoose.model('Course', courseSchema);
