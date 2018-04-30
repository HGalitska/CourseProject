const Document = require('../models/Document.model.js');

function validateRequestData(req) {
  if (!req.body.title) {
    return res.status(400).send({
      message: "Document title can not be empty."
    });
  }

  if (!req.body.filePath) {
    return res.status(400).send({
      message: "Document file path can not be empty."
    });
  }
}

exports.create = (req, res) => {

  validateRequestData(req);

  const document = new Document({
    title: req.body.title,
    filePath: req.body.filePath
  });

  document.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the document."
      });
    });
};

// Retrieve and return all Documents from the database.
exports.findAll = (req, res) => {
  Document.find()
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

  validateRequestData(req);

  // Find Document and update it with the request body
  Document.findByIdAndUpdate(req.params.documentId, {
      title: req.body.title,
      filePath: req.body.filePath
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
      if (!document) {
        return res.status(404).send({
          message: "Document not found with id " + req.params.documentId
        });
      }
      res.send({
        message: "Document deleted successfully!"
      });
    }).catch(err => {
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
