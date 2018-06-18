const Task = require('../models/task.model.js');

exports.create = (req, res) => {

    const task = new Task({
        title: req.body.title || "NO NAME",
        description: req.body.description || "",
        deadline: req.body.deadline || "",
        docs: req.body.docs || [],
        maxMark: req.body.maxMark || 5
    });

    task.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task."
            });
        });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
    Task.find().sort([['_id', 1]])
        .then(tasks => {
            res.send(tasks);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving tasks."
                });
        });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty."
        });
    }

    // Find task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        title: req.body.title,
        description: req.body.description || "",
        deadline: req.body.deadline || "",
        docs: req.body.docs || [],
        maxMark: req.body.maxMark || 5
    }, {
        new: true
    })
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });

};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send({
                message: "Task deleted successfully!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });

};
