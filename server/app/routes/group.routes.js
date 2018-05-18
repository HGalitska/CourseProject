module.exports = (app) => {
    const groups = require('../controllers/group.controller.js');

    // Create a new Group
    app.post('/groups', groups.create);

    // Retrieve all Groups
    app.get('/groups', groups.findAll);

        // Retrieve a single Group with groupId
    app.get('/groups/:groupId', groups.findOne);

    // Update a Group with groupId
    app.put('/groups/:groupId', groups.update);
    // app.put('/groups_update', groups.updateAll);

    // Delete a Group with groupId
    app.delete('/groups/:groupId', groups.delete);
}
