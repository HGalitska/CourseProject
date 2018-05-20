
const Document = require('../models/document.model.js');
// const SubmittedTask = require('../models/submittedTask.model.js');
const Course = require('../models/Course.model.js');
const Task = require('../models/task.model.js');


exports.create = (req, res) => {
    const files = req.files;
    arr = [];

    for (var i = 0; i < files.length; i++) {

        const document = new Document({
            title: files[i].originalname,
            filePath: files[i].filename
        });

        arr.push(document);
    }


    var promise = Document.insertMany(arr);
    console.log(promise);
    promise.then(function (doc) {
        res.send(doc);
    })
};

// Retrieve and return all Documents from the database.
exports.findAll = (req, res) => {
    Document.find().sort([['_id', 1]])
        .then(documents => {
            res.send(documents);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving documents."
                });
        });
};

// Find a single Document with a documentId
exports.findOne = (req, res) => {
    Document.findById(req.params.documentId)
        .then(document => {
            if (!document) {
                return res.status(404).send({
                    message: "Document not found with id " + req.params.documentId
                });
            }
            res.send(document);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Document not found with id " + req.params.documentId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Document with id " + req.params.documentId
        });
    });
};

// Update a Document identified by the documentId in the request
exports.update = (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "Document title can not be empty."
        });
    }

    // Find Document and update it with the request body
    Document.findByIdAndUpdate(req.params.documentId, {
        title: req.body.title,
        filePath: req.body.filePath || ""
    }, {
        new: true
    })
        .then(document => {
            if (!document) {
                return res.status(404).send({
                    message: "Document not found with id " + req.params.documentId
                });
            }
            res.send(document);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Document not found with id " + req.params.documentId
            });
        }
        return res.status(500).send({
            message: "Error updating Document with id " + req.params.documentId
        });
    });

};

// Delete a Document with the specified documentId in the request
exports.delete = (req, res) => {
    Document.findByIdAndRemove(req.params.documentId)
        .then(document => {

            if (document)
            {
                console.log(document);
                Course.find().then(
                    courses => {
                        courses.forEach(function (course) {
                            var updatedCourse = course;
                            console.log(updatedCourse);
                            updatedCourse.docs.remove(req.params.documentId);
                            console.log(updatedCourse);
                            Course.findByIdAndUpdate(course._id, updatedCourse).then(
                                data => {
                                    console.log(data);
                                }
                            )
                        })
                    }
                )

                Task.find().then(
                    tasks => {
                        tasks.forEach(function (task) {
                            var updatedTask = task;
                            updatedTask.docs.remove(req.params.documentId);
                            Task.findByIdAndUpdate(task._id, updatedTask).then(
                                task => {
                                    console.log(task);
                                }
                            )
                        })
                    })

                // SubmittedTask.find().then(
                //     tasks => {
                //         tasks.forEach(function (task) {
                //             var updatedTask = task;
                //             updatedTask.docs.remove(req.params.documentId);
                //             SubmittedTask.findByIdAndUpdate(task._id, updatedTask).then(
                //                 task => {
                //                     console.log(task);
                //                 }
                //             )
                //         })
                //     })
            }

            if (!document) {
                return res.status(404).send({
                    message: "Document not found with id " + req.params.documentId
                });
            }
            res.send({
                message: "Document deleted successfully!"
            });
        }).catch(err => {
            console.log(err);
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Document not found with id " + req.params.documentId
            });
        }
        return res.status(500).send({
            message: "Could not delete Document with id " + req.params.documentId
        });
    });

};
