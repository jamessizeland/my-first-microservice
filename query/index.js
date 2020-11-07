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

//handle service data requests
app.get('/events', (req, res) => {

});

// handle service incoming data
app.post('/events', (req, res) => {
    const event = req.body;

    res.send({status: 'OK'});
});

//spin up server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});