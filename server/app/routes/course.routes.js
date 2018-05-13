module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    // Create a new Course
    app.post('/courses', courses.create);

    // Retrieve all Courses
    app.get('/courses', courses.findAll);
    // Get Course which constains group with groupId
    // Retrieve a single Course with courseId
    app.get('/courses/:courseId', courses.findOne);

    app.get('/courses/group/:groupId', courses.findForGroup);



    // Update a Course with courseId
    app.put('/courses/:courseId', courses.update);

    // Delete a Course with courseId
    app.delete('/courses/:courseId', courses.delete);
}
