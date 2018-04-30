module.exports = (app) => {
    const submittedTasks = require('../controllers/submittedTask.controller.js');

    // Create a new SubmittedTask
    app.post('/submittedTasks', submittedTasks.create);

    // Retrieve all SubmittedTasks
    app.get('/submittedTasks', submittedTasks.findAll);

    // Retrieve a single SubmittedTask with submittedTaskId
    app.get('/submittedTasks/:submittedTaskId', submittedTasks.findOne);

    // Update a SubmittedTask with submittedTaskId
    app.put('/submittedTasks/:submittedTaskId', submittedTasks.update);

    // Delete a SubmittedTask with submittedTaskId
    app.delete('/submittedTasks/:submittedTaskId', submittedTasks.delete);
}
