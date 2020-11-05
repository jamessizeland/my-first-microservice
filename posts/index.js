// initialize node packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// initialize app variables
const port = 4000;


// handle browser requests
app.get("/posts", (req, res) => {

});

app.post("/posts", (req, res) => {

});

//spin up server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});