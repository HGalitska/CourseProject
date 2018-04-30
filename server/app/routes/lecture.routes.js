module.exports = (app) => {
    const lectures = require('../controllers/lecture.controller.js');

    // Create a new Lecture
    app.post('/lectures', lectures.create);

    // Retrieve all Lectures
    app.get('/lectures', lectures.findAll);

    // Retrieve a single Lecture with lectureId
    app.get('/lectures/:lectureId', lectures.findOne);

    // Update a Lecture with lectureId
    app.put('/lectures/:lectureId', lectures.update);

    // Delete a Lecture with lectureId
    app.delete('/lectures/:lectureId', lectures.delete);
}
