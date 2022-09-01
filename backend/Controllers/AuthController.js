const User =require('../Model/UserModel')
const bcrypt = require("bcrypt");
const TokenGenerator = require('../middleware/TokenGenerator')
const {userValidation} = require('../middleware/Validation')
const login = async (req,res)=>
{
    const {error} = userValidation(req.body);
    if(error)
    {
        return res.status(400).json({error: error.details[0].message});
    }
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
        const accessToken = TokenGenerator(user);
        return res.json({userId: user.id,
            email:user.email,
            token: accessToken,
        });
    }
    catch (err)
    {
        console.log(err);
    }
}

const signup = async (req, res) =>{
    const {error} = userValidation(req.body);
    if(error)
    {
        return res.status(400).json({error: error.details[0].message});
    }
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
    const accessToken = TokenGenerator(user);
    return res.status(201).
    json({userId: user.id,
        email:user.email,
        token: accessToken});
};

module.exports =
    {
        login,
        signup
    }