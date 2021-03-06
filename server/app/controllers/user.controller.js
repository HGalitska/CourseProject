const User = require('../models/user.model.js');
const bcrypt = require('bcrypt')


exports.create = (req, res) => {

  if (!req.body.username) {
    return res.status(400).send({
      message: "Username can not be empty."
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Password can not be empty."
    });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName || "",
    lastName: req.body.lastName,
    eMail: req.body.eMail || ""
  });

  user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find().sort([['_id', 1]])
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500)
        .send({
          message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

  if (!req.body.username) {
    return res.status(400).send({
      message: "Username can not be empty."
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Password can not be empty."
    });
  }

  if (!req.body.lastName) {
    return res.status(400).send({
      message: "Last name can not be empty."
    });
  }

  var hashedPassword = bcrypt.hashSync(req.body.password, 10);

  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.userId, {
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName,
      eMail: req.body.eMail || ""
    }, {
      new: true
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }


      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
      });
    });

};

// // Update all users *for batch imports*
// exports.updateAll = (req, res) => {
//
//   User.find()
//     .then(users => {
//       for (var i = 0; i < users.length; i++) {
//         var hash = bcrypt.hashSync("password", bcrypt.genSaltSync(10));
//         User.findOneAndUpdate({
//           _id: users[i]._id
//         }, {
//           $set: {
//             password: hash
//           }
//         }, function(err, doc) {
//           if (err) {
//             console.log("Something wrong when updating data!");
//           }
//
//           console.log(doc);
//         });
//       }
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

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send({
        message: "User deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });

};
