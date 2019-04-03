// reference the epxress library, body-parser, handlebars and path module
let express = require('express');
let bodyparser = require('body-parser');
let exphbs = require('express-handlebars');
let path = require('path');

// creates an express application
let app = express();

// Boot up database connection
require('./models/db');

// reference and connect to routes
let studentRoute = require('./routes/student');
let personRoute = require('./routes/person');

// Allow express to receive json from request bodies
// does the parsing for us
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Page generation config -- setting up handlebars, a view engine for express
// __dirname is where the project is currently running from (src)
app.set('views', path.join(__dirname, '../views/'));
app.engine('hbs', exphbs({extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: path.join(__dirname, '../views/layouts/')
}));
app.set('view engine', 'hbs');

// registering the studentRoute and personRoute
// order in which these types of handlers matters
// gives the order in which middleware functions are executed
app.use('/student', studentRoute);
app.use('/person', personRoute);

// serve static content from the public folder
app.use(express.static('public'));

// Handler for error 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost');
});

// Handler for error 500
app.use((err, req, res, next) => {
    console.error(err)

    // __dirname is where the project is running from (src)
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

// declare the port on which the server will run
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Application running on ${PORT}`));