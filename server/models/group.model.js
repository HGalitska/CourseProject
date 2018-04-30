var mongoose = require("mongoose");

var groupSchema = new mongoose.Schema({
    name            : String,
    students        : [{ type: mongoose.Schema.ObjectId, ref: "User" }]
});

module.exports = mongoose.model('Group', courseSchema);
