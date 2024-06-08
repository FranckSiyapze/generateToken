// Import express
let express = require('express');
let dotenv = require('dotenv');
// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
     dotenv.config();
}
// Initialize the app
let app = express();
app.use(express.json());
// Import routes
let apiRoutes = require("./api-routes");
// Use Api routes in the App
app.use('/api', apiRoutes);
// Setup server port
var port = process.env.PORT || 8000;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running Generate Token on port and Nodemon " + port);
});