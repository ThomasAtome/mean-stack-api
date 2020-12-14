require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors');

// Create app
const app = express();

// Define express body parser
app.use(express.json());

// Prevent CORS Policy Errors
app.use(cors());

// Connect the DB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);

require('./app/routes/sales')(app);
require('./app/routes/sale')(app);

// Define default route
app.use((req, res, next) => {
    res.redirect('/sales');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
