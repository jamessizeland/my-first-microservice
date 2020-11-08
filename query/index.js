// initialize node packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// initialize app variables
const postServicePort = 4000;
const commentServicePort = 4001;
const port = 4002;
const posts={}; //initialize empty object for incoming posts

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
    console.log(posts);
    res.send({status: 'OK'});
});

//spin up server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});