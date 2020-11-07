// initialize node packages
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

// initialize app variables
const port = 4003;
const eventServicePort = 4005;

// handle service data requests

// handle service incoming data
app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    const tabooWord = 'orange';

    if (type === 'CommentCreated') {
        const status = data.content.includes(tabooWord) ? 'rejected' : 'approved';

        await axios.post(`http://localhost:${eventServicePort}/events`, {
            type: 'commentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    };
    res.send({status: 'OK'});
});

// spin up server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});