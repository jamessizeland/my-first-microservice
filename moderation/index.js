// initialize node packages
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

// initialize app variables
const port = 4003;

//handle service data requests
// app.get('/posts', (req, res) => {
//     res.send();
// });

// handle service incoming data
app.post('/events', (req, res) => {
    
    res.send({status: 'OK'});
});

//spin up server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});