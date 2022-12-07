require("dotenv").config();
const { PORT_TEST, PORT, NODE_ENV, API_VERSION } = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;

// Express Initialization
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS allow all
app.use(cors());

// API routes
app.use('/api/' + API_VERSION, []);

// Page not found
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/client/404.html');
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

if (NODE_ENV != 'production') {
    app.listen(port, async () => {
        console.log(`Listening on port: ${port}`);
    });
}

module.exports = app;