// initialize node packages
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

// initialize app variables
const postServicePort = 4000;
const commentServicePort = 4001;
const queryServicePort = 4002;
const port = 4005;

// handle service incoming data
app.post('/events', (req, res) => {
    const event = req.body;

    axios.post(`http://localhost:${postServicePort}/events`, event);
    axios.post(`http://localhost:${commentServicePort}/events`, event);
    axios.post(`http://localhost:${queryServicePort}/events`, event);

    res.send({status: 'OK'});
});

//spin up server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});