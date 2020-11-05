// Initialize node packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Initialize service variables
const {
    randomBytes
} = require('crypto');
const port = 4001;
const commentsByPostId = {};

//handle service requests for data
app.get("/posts/:id/comments", (req, res) => {

});

//handle service incoming data
app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {
        content
    } = req.body;
    const comments = commentsByPostId[req.params.id] || []; //if no comments yet
    comments.push({
        id: commentId,
        content
    });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});


//spin up server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});