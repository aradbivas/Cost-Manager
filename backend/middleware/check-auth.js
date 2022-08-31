const jwt = require('jsonwebtoken');
const requireAuth =  (req,res,next) =>{

    const {authorization} = req.headers;

    if(!authorization)
    {
        return res.status(401).json("Authorization token required");
    }
    try {
        const token = authorization.split(" ")[1];
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedToken.userId;
        next();
    }
    catch (err)
    {
        res.status(401).json({error: "Request is not authorized"});
    }

}
module.exports = requireAuth