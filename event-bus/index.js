const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const postServicePort = 4000;
const commentServicePort = 4001;
const queryServicePort = 4002;
const eventServicePort = 4005;

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post(`http://localhost:${postServicePort}/events`, event);
    axios.post(`http://localhost:${commentServicePort}/events`, event);
    axios.post(`http://localhost:${queryServicePort}/events`, event);

    res.send({status: 'OK'});
});

app.listen(eventServicePort, () => {
    console.log(`Listening on port ${eventServicePort}`);
});