var mongoose = require("mongoose");

var lectureSchema = new mongoose.Schema({
    title         : String,
    description   : String,
    docs          : [{ type: mongoose.Schema.ObjectId, ref: "Document" }]
});

module.exports = mongoose.model('Lecture', lectureSchema);
