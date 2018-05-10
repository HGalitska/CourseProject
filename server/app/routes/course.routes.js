module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    // Create a new Course
    app.post('/courses', courses.create);

    // Retrieve all Courses
    app.get('/courses', courses.findAll);
    // Get Course which constains group with groupId
    app.get('/courses/:groupId', courses.findForGroup);

    // Retrieve a single Course with courseId
    app.get('/courses/:courseId', courses.findOne);

    // Update a Course with courseId
    app.put('/courses/:courseId', courses.update);

    // Delete a Course with courseId
    app.delete('/courses/:courseId', courses.delete);
}
