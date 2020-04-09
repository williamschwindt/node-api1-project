const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.post('/api/users', (req, res) => {
    //Creates a user using the information sent inside the request body
});

server.get('/api/users', (req, res) => {
    //Returns an array users.
});

server.get('/api/users/:id', (req, res) => {
    //Returns the user object with the specified id.
});

server.delete('/api/users/:id', (req, res) => {
    //Removes the user with the specified id and returns the deleted user.
});

server.put('/api/users/:id', (req, res) => {
    //Updates the user with the specified id using data from the request body. Returns the modified user
});

server.listen(8000, () => console.log('API running on port 8000'));