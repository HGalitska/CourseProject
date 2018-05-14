module.exports = (app, upload) => {
    const documents = require('../controllers/document.controller.js');

    // Create a new Document
    app.post('/documents', upload.single('document'), documents.create);

    // Retrieve all Documents
    app.get('/documents', documents.findAll);

    // Retrieve a single Document with documentId
    app.get('/documents/:documentId', documents.findOne);

    // Update a Document with documentId
    app.put('/documents/:documentId', documents.update);

    // Delete a Document with documentId
    app.delete('/documents/:documentId', documents.delete);
}
