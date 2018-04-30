const Lecture = require('../models/Lecture.model.js');

exports.create = (req, res) => {

  if (!req.body.title) {
    return res.status(400).send({
      message: "Lecture title can not be empty."
    });
  }

  if (!req.body.docs || !req.body.docs[0]) {
    return res.status(400).send({
      message: "Lecture can not be empty."
    });
  }

  const lecture = new Lecture({
    title: req.body.title,
    description: req.body.description || "",
    docs: req.body.docs
  });

  lecture.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the lecture."
      });
    });
};

// Retrieve and return all Lectures from the database.
exports.findAll = (req, res) => {
  Lecture.find()
    .then(lectures => {
      res.send(lectures);
    })
    .catch(err => {
      res.status(500)
        .send({
          message: err.message || "Some error occurred while retrieving lectures."
        });
    });
};

// Find a single Lecture with a lectureId
exports.findOne = (req, res) => {
  Lecture.findById(req.params.lectureId)
    .then(lecture => {
      if (!lecture) {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      res.send(lecture);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Lecture with id " + req.params.lectureId
      });
    });
};

// Update a Lecture identified by the lectureId in the request
exports.update = (req, res) => {

  if (!req.body.title) {
    return res.status(400).send({
      message: "Lecture title can not be empty."
    });
  }

  if (!req.body.docs || !req.body.docs[0]) {
    return res.status(400).send({
      message: "Lecture can not be empty."
    });
  }

  // Find Lecture and update it with the request body
  Lecture.findByIdAndUpdate(req.params.lectureId, {
    title: req.body.title,
    description: req.body.description || "",
    docs: req.body.docs
    }, {
      new: true
    })
    .then(lecture => {
      if (!lecture) {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      res.send(lecture);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      return res.status(500).send({
        message: "Error updating Lecture with id " + req.params.lectureId
      });
    });

};

// Delete a Lecture with the specified lectureId in the request
exports.delete = (req, res) => {
  Lecture.findByIdAndRemove(req.params.lectureId)
    .then(lecture => {
      if (!lecture) {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      res.send({
        message: "Lecture deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Lecture not found with id " + req.params.lectureId
        });
      }
      return res.status(500).send({
        message: "Could not delete Lecture with id " + req.params.lectureId
      });
    });

};
