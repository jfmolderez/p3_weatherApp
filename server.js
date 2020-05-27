// Setup empty JS object to act as endpoint for all routes
const projectData = {
};

let id = 0;

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const listening = () => {
    console.log(`Server running on port ${port}...`)
}
const server = app.listen(port, listening);


// Routes
const path = require('path');

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.get("/all", (req, res) => {
    res.status(200).json({
        status: 'success',
        results: Object.keys(projectData).length,
        data: projectData
    });
});

app.post("/all", (req, res) => {
    projectData[id] = req.body;
    id = id + 1;
    // console.log("id = ", id);
    // console.log("req.body = ", req.body);
    // console.log("projectData = ", projectData);
    res.status(201).json({
        // send a response
        status: 'success',
        newEntry: req.body
    })
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'website', '404.html'));
})
