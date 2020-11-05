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
const {
    prototype
} = require('stream');
const port = 4001;

//handle service requests for data
app.get("/posts/:id/comments", (req, res) => {

});

//handle service incoming data
app.post("/posts/:id/comments", (req, res) => {

});


//spin up server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});