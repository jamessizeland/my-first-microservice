// initialize node packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialize app variables
const port = 4000;
const eventServicePort = 4005;
const posts = {};

// handle service requests for data
app.get("/posts", (req, res) => {
    res.send(posts);
});

// handle service incoming data
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex'); //randomly assign id
    const {title} = req.body;
    posts[id] = {
        id,
        title
    };
    await axios.post(`http://localhost:${eventServicePort}/events`, {
        type: 'PostCreated',
        data: {
            id, title
        }
    });
    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
    console.log('Received Event:', req.body.type);
    res.send({}); // respond to event with empty object to confirm
});

//spin up server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});