var mongoose = require("mongoose");

var documentSchema = new mongoose.Schema({
    title     : String,
    filePath  : String
});


module.exports = mongoose.model('Document', documentSchema);