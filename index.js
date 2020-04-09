const express = require('express');
const db = require('./database.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({ message: "Need a user name and bio" })
    };

    let newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    });

    if(!newUser) {
        return res.status(500).json({ message: "There was an error while saving the user to the database" });
    } else {
        return res.status(201).json(newUser);
    }
});

server.get('/api/users', (req, res) => {
    const users = db.getUsers();

    if(!users) {
        return res.status(500).json({ message: "The users information could not be retrieved." });
    } else {
        return res.status(200).json(users);
    }
});

server.get('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if(!user) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        return res.status(200).json(user);
    }
});

server.delete('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if(user) {
        db.deleteUser(user.id);
        res.status(204).end();
    } else {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});

server.put('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if(user && req.body.name && req.body.bio) {
       let newUser = db.updateUser(user.id, {
            name: req.body.name,
            bio: req.body.bio
        });
        res.status(200).json(newUser);
    }
    if(!user) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({ message: "Need a user name and bio" });
    }
    else {
        return res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

server.listen(8000, () => console.log('API running on port 8000'));