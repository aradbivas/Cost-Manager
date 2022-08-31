require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const requireAuth = require('./middleware/check-auth')
const reportRoutes = require('./Routes/Report')
const User = require('./Model/UserModel')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use('/api/report', reportRoutes)

mongoose.connect("mongodb+srv://" + process.env.password +"@cluster0.rfa43.mongodb.net/Costs");

app.post("/register", async function(req, res){

    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = new User({
        email: req.body.email,
        password: hashedPassword,

    });
    try
    {
        const createdUser = await User.findOne({email: user.email});
        if(createdUser)
        {
            return res.status(400).json({error: "Email already exists"});
        }
        else
        {
            await user.save();
        }

    }catch (err)
    {
        return res.status(400);
    }
    const accessToken = AccessGenerator(user);
    return res.status(201).
    json({userId: user.id,
        email:user.email,
        token: accessToken});


});
app.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user)
        {
            return res.status(400).json({error: "Wrong Email or Password"});
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword)
        {
            return res.status(400).json({error: "Wrong Email or Password"});
        }
        const accessToken = AccessGenerator(user);
        return res.json({userId: user.id,
            email:user.email,
            token: accessToken,
        });
    }
    catch (err)
    {
        console.log(err);
    }


})
function AccessGenerator(user)
{
    const token = jwt.sign({
            userId: user.id,
            email:user.email},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1h"
        });
    return token;
}


app.listen(8000, function() {
    console.log("Server started on port 8000");
});