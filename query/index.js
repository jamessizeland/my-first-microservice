// initialize node packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialize app variables
const eventServicePort = 4005;
const port = 4002;
const posts={}; //initialize empty object for incoming posts

// initialize app private functions
const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    } else if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }
    if (type ==='CommentUpdated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    };
};

//handle service data requests
app.get('/posts', (req, res) => {
    res.send(posts);
});

// handle service incoming data
app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    } else if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }
    if (type ==='CommentUpdated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    };
    handleEvent(type, data);
    res.send({status: 'OK'});
});

//spin up server
app.listen(port, async () => {
    console.log(`Listening on port ${port}`);

    const res = await axios.get(`http://localhost:${eventServicePort}/events`);
    
    for (let event of res.data) {
        console.log(`Processing event: ${event.type}`);
        handleEvent(event.type, event.data);
    };
});