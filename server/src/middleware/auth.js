const jwt       = require('jsonwebtoken');
const User      = require('../models/users');
const common    = require('./../helper/common');

const auth = async (req, res, next) => {
    try {
        /*
        https://alligator.io/nodejs/express-cookies/
        const parsedCookies = {};
        rawCookies.forEach(rawCookie=>{
        const parsedCookie = rawCookie.split('=');
        // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
        });*/

        const token      = req.headers.cookie.split('=')[1];
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser   = await User.findOne({_id: verifyUser._id, "tokens.token": token});
        const rootData   =  {
                                id:   rootUser._id,
                                name:   rootUser.name,
                                email:  rootUser.email,
                                phone:  rootUser.phone,
                                address:rootUser.address,
                                tokens: rootUser.tokens,
                                date:   rootUser.date,
                            };

        if(!rootUser) {
            throw new Error('User not Found');
        } else {
            req.token   = token;
            req.rootUser= rootData;
            req.forCookie= rootUser; //For store all data again except recent token data after logout
            req.userID  = rootUser._id;
            next();            
        }
    }
    catch(err) {
        common.handleError(err, res, 'Unauthorized  Access: Token not found');
    }
}
module.exports = auth;