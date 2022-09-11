require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const reportRoutes = require('./Routes/Report')
const userRoutes = require('./Routes/User')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use('/api/report', reportRoutes)
app.use('/api/user', userRoutes)

mongoose.connect("mongodb+srv://" + process.env.password +"@cluster0.rfa43.mongodb.net/Costs");


app.listen(4020, function() {
    console.log("Server started on port 4020");
});