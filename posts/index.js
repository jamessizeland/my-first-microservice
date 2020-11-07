// initialize node packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialize app variables
const {
    randomBytes
} = require('crypto');
const port = 4000;
const posts = {};

// handle service requests for data
app.get("/posts", (req, res) => {
    res.send(posts);
});

// handle service incoming data
app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString('hex'); //randomly assign id
    const {
        title
    } = req.body;
    posts[id] = {
        id,
        title
    };
    res.status(201).send(posts[id]);
});

//spin up server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});