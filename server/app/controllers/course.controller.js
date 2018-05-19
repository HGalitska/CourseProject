const Course = require('../models/Course.model.js');

exports.create = (req, res) => {

    if (!req.body.owner_id) {
        return res.status(400).send({
            message: "Course owner id can not be empty."
        });
    }

    if (!req.body.name) {
        return res.status(400).send({
            message: "Course name can not be empty."
        });
    }

    const course = new Course({
        owner_id: req.body.owner_id,
        name: req.body.name,
        description: req.body.description,
        docs: req.body.docs || [],
        tasks: req.body.tasks || [],
        members: req.body.members || []
    });

    course.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the course."
            });
        });
};

// Retrieve and return all Courses from the database.
exports.findAll = (req, res) => {
    Course.find()
        .then(courses => {
            res.send(courses);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving courses."
                });
        });
};

// Find a single Course with a courseId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send(course);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Course with id " + req.params.courseId
        });
    });
};

// Update a Course identified by the courseId in the request
exports.update = (req, res) => {
    console.log("HERE");

    if (!req.body.owner_id) {
        return res.status(400).send({
            message: "Course owner id can not be empty."
        });
    }

    if (!req.body.name) {
        return res.status(400).send({
            message: "Course name can not be empty."
        });
    }

    console.log(req.body.docs);

    // Find Course and update it with the request body
    Course.findByIdAndUpdate(req.params.courseId, {
        owner_id: req.body.owner_id,
        name: req.body.name,
        description: req.body.description,
        docs: req.body.docs || [],
        tasks: req.body.tasks || [],
        members: req.body.members || []
    }, {
        new: true
    })
        .then(course => {
            console.log(course);
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send(course);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        return res.status(500).send({
            message: "Error updating Course with id " + req.params.courseId
        });
    });

};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send({
                message: "Course deleted successfully!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        return res.status(500).send({
            message: "Could not delete Course with id " + req.params.courseId
        });
    });

};
