// Load our .env file
require('dotenv').config();

// Import express and cors
const express = require('express');
const cors = require('cors');
const morgan = require("morgan")
const bodyParser = require("body-parser")




// Set up express
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
app.disable('x-powered-by');
app.use(cors());
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));





// Tell express to use your routers here
const customerRouter = require('./routers/customer');
const moviesRouter = require('./routers/movies');
const screenRouter = require('./routers/screen')
const ticketRouter = require('./routers/ticket')
const reviewRouter = require('./routers/review')
app.use('/customer', customerRouter);
app.use('/movies', moviesRouter);
app.use('/screen', screenRouter)
app.use('/ticket', ticketRouter)
app.use('/review', reviewRouter)






// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get('*', (req, res) => {
    res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
