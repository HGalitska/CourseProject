module.exports = (app, checkJWT) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/users', users.create);

    app.use(checkJWT);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.findOne);

    // Update a User with userId
    app.put('/users/:userId', users.update);
    app.put('/users_update', users.updateAll);

    // Delete a User with userId
    app.delete('/users/:userId', users.delete);
}
