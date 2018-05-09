const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');

exports.create = (req, res) => {

  if (!req.body.name) {
    return res.status(400).send({
      message: "Group name can not be empty."
    });
  }

  if (!req.body.students || !req.body.students[0]) {
    return res.status(400).send({
      message: "Group can not be empty."
    });
  }

  const group = new Group({
    name: req.body.name,
    students: req.body.students
  });

  group.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the group."
      });
    });
};

// Retrieve and return all Groups from the database.
exports.findAll = (req, res) => {
  Group.find()
    .then(groups => {
      res.send(groups);
    })
    .catch(err => {
      res.status(500)
        .send({
          message: err.message || "Some error occurred while retrieving groups."
        });
    });
};

// Find a single Group with a groupId
exports.findOne = (req, res) => {
  Group.findById(req.params.groupId)
    .then(group => {
      if (!group) {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      res.send(group);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Group with id " + req.params.groupId
      });
    });
};

// Update a Group identified by the groupId in the request
exports.update = (req, res) => {

  if (!req.body.name) {
    return res.status(400).send({
      message: "Group name can not be empty."
    });
  }

  if (!req.body.students || !req.body.students[0]) {
    return res.status(400).send({
      message: "Group can not be empty."
    });
  }

  // Find Group and update it with the request body
  Group.findByIdAndUpdate(req.params.groupId, {
    name: req.body.name,
    students: req.body.students
    }, {
      new: true
    })
    .then(group => {
      if (!group) {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      res.send(group);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      return res.status(500).send({
        message: "Error updating Group with id " + req.params.groupId
      });
    });

};

// exports.updateAll = (req, res) => {
//   var group3 = [];
//   var group4 = [];
//
//   User.find()
//     .then(users => {
//       for (var i = 48; i < 72; i++) {
//         group3.push(users[i]._id);
//       }
//
//       Group.findOneAndUpdate({
//         _id: "5af33bc6a85207026c0d6696"
//       }, {
//         $set: {
//           students: group3
//         }
//       }, function(err, doc) {
//         if (err) {
//           console.log("Something wrong when updating data!");
//         }
//
//         console.log(doc);
//       });
//       for (var i = 72; i < 96; i++) {
//         group4.push(users[i]._id);
//       }
//
//       Group.findOneAndUpdate({
//         _id: "5af33be3a85207026c0d6697"
//       }, {
//         $set: {
//           students: group4
//         }
//       }, function(err, doc) {
//         if (err) {
//           console.log("Something wrong when updating data!");
//         }
//
//         console.log(doc);
//       });
//
//
//
//       res.send({
//         message: "Updated all users."
//       })
//     })
//     .catch(err => {
//       res.status(500)
//         .send({
//           message: err.message || "Some error occurred while retrieving users."
//         });
//     });
// };

// Delete a Group with the specified groupId in the request
exports.delete = (req, res) => {
  Group.findByIdAndRemove(req.params.groupId)
    .then(group => {
      if (!group) {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      res.send({
        message: "Group deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Group not found with id " + req.params.groupId
        });
      }
      return res.status(500).send({
        message: "Could not delete Group with id " + req.params.groupId
      });
    });

};
