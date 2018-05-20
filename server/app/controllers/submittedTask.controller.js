const SubmittedTask = require('../models/SubmittedTask.model.js');

exports.create = (req, res) => {

  if (!req.body.task_id) {
    return res.status(400).send({
      message: "SubmittedTask task id can not be empty."
    });
  }

  if (!req.body.student_id) {
    return res.status(400).send({
      message: "SubmittedTask student id can not be empty."
    });
  }

  if (!req.body.date) {
    return res.status(400).send({
      message: "SubmittedTask date can not be empty."
    });
  }

  // if (!req.body.docs || !req.body.docs[0]) {
  //   return res.status(400).send({
  //     message: "SubmittedTask can not be empty."
  //   });
  // }

  const submittedTask = new SubmittedTask({
    task_id       : req.body.task_id,
    student_id    : req.body.student_id,
    date          : req.body.date,
    mark          : -1,
    docs          : req.body.docs
  });

  submittedTask.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the submittedTask."
      });
    });
};

// Retrieve and return all SubmittedTasks from the database.
exports.findAll = (req, res) => {
  SubmittedTask.find().sort([['_id', 1]])
    .then(submittedTasks => {
      res.send(submittedTasks);
    })
    .catch(err => {
      res.status(500)
        .send({
          message: err.message || "Some error occurred while retrieving submittedTasks."
        });
    });
};

// Find a single SubmittedTask with a submittedTaskId
exports.findOne = (req, res) => {
  SubmittedTask.findById(req.params.submittedTaskId)
    .then(submittedTask => {
      if (!submittedTask) {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      res.send(submittedTask);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      return res.status(500).send({
        message: "Error retrieving SubmittedTask with id " + req.params.submittedTaskId
      });
    });
};

// Update a SubmittedTask identified by the submittedTaskId in the request
exports.update = (req, res) => {

  if (!req.body.task_id) {
    return res.status(400).send({
      message: "SubmittedTask task id can not be empty."
    });
  }

  if (!req.body.student_id) {
    return res.status(400).send({
      message: "SubmittedTask student id can not be empty."
    });
  }

  if (!req.body.date) {
    return res.status(400).send({
      message: "SubmittedTask date can not be empty."
    });
  }

  if (!req.body.docs || !req.body.docs[0]) {
    return res.status(400).send({
      message: "SubmittedTask can not be empty."
    });
  }

  // Find SubmittedTask and update it with the request body
  SubmittedTask.findByIdAndUpdate(req.params.submittedTaskId, {
    task_id       : req.body.task_id,
    student_id    : req.body.student_id,
    date          : req.body.date,
    mark          : req.body.mark,
    docs          : req.body.docs
    }, {
      new: true
    })
    .then(submittedTask => {
      if (!submittedTask) {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      res.send(submittedTask);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      return res.status(500).send({
        message: "Error updating SubmittedTask with id " + req.params.submittedTaskId
      });
    });

};

// Delete a SubmittedTask with the specified submittedTaskId in the request
exports.delete = (req, res) => {
  SubmittedTask.findByIdAndRemove(req.params.submittedTaskId)
    .then(submittedTask => {
      if (!submittedTask) {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      res.send({
        message: "SubmittedTask deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "SubmittedTask not found with id " + req.params.submittedTaskId
        });
      }
      return res.status(500).send({
        message: "Could not delete SubmittedTask with id " + req.params.submittedTaskId
      });
    });

};
