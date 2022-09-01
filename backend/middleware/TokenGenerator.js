const jwt = require("jsonwebtoken");

const AccessGenerator = (user) =>
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
module.exports = AccessGenerator;