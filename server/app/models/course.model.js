var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    owner_id        : { type: mongoose.Schema.ObjectId, ref: "User" },
    name            : String,
    description     : String,
    docs            : [{ type: mongoose.Schema.ObjectId }],
    tasks           : [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    members         : [{ type: mongoose.Schema.ObjectId, ref: "Group" }]
});

module.exports = mongoose.model('Course', courseSchema);
