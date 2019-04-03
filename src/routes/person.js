// reference express
let express = require('express');

// create a router
let router = express.Router();

// Handling for error 500
router.get('/error', (req, res) => {
    throw new Error('This is a forced error.');
});

// QueryString = a query property on the request object
// localhost:3000/person?name=joseph&age=20
router.get('/', (req, res) => {
    if(req.query.name && req.query.age) {
        res.send(`You have requested a person ${req.query.name}, who is ${req.query.age}.`);
    } else if (req.query.name) {
        res.send(`You have requested a person ${req.query.name}`);
    } else {
        res.send('You have requested a person');
    }
});


// GET request for a subroute that can be mapped to a variable
// variables (like name) available through the request object through req.params
// localhost:3000/person/joseph
router.get('/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`);
});



// export the router
// can now import it to the server.js file
module.exports = router;