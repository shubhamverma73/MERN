const express   = require('express');
const bcrypt    = require('bcryptjs');
const router    = express.Router();
const User      = require('../models/users');
const common    = require('../helper/common');
const validator = require('validator');
const auth      = require("../middleware/auth");

// ================================ Create a new student (Using Async Await) ===============================
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const isValidEmail = validator.isEmail(email);

        if(!name || !email || !password || !phone || !address) {
            common.handleError(res, res, 'Some fields are missing, please check and try again.');
        } else {
            if(isValidEmail === false) {
                common.handleError(res, res, 'Email address not valid.');
            } else {
                const isEmailExists = await User.findOne({email: email});
                if(isEmailExists === null) {                    

                    const user = new User({
                        name:       name,
                        email:      email,
                        password:   password,
                        phone:      phone,
                        address:    address
                    });

                    const token     = await user.generateAuthToken(); // Calling Middleware function

                    // Our token expires after one day
                    const oneDayToSeconds = 24 * 60 * 60;
                    res.cookie("jwt", token, {
                        maxAge: oneDayToSeconds,
                        httpOnly: true
                    });

                    await user.save();
                    common.handleSuccess(req, res, 'User created successfully.');
                } else {
                    common.handleError(res, res, 'Email already exists.');
                }
            }
        }
    }
    catch(err) {
        common.handleError(err, res, '');
    }
});

router.post('/login', async (req, res) => {
    try {
        const email             = req.body.email;
        const password          = req.body.password;
        const isValidEmail = validator.isEmail(email);
        if(!email || !password) {
            common.handleError(res, res, 'Some fields are missing, please check and try again.');
        } else {
            if(isValidEmail === false) {
                common.handleError(res, res, 'Email address not valid.');
            } else {        
                const result    = await User.findOne({email: email});
                const isMatch   = await bcrypt.compare(password, result.password);
                const token     = await result.generateAuthToken(); // Calling Middlewear function

                if(isMatch) {
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 6000000), //for a year.
                        httpOnly: true,
                        secure: false
                    });
                    common.handleData(res, res, result);
                } else {
                    common.handleError(res, res, 'Invalid credentials, please try again.');
                }
            }
        }
    }
    catch(err) {
        common.handleError(res, res, 'Record not found, try again.');
    }
});

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const isValidEmail = validator.isEmail(email);
        if(!name || !email || !subject || !message) {
            common.handleError(res, res, 'Some fields are missing, please check and try again.');
        } else {
            if(isValidEmail === false) {
                common.handleError(res, res, 'Email address not valid.');
            } else {      
                const result    = await User.findOne({email: email});

                if(result) {  
                    const userContact = await result.addMessage(name, email, subject, message);
                    // await result.save();
                    common.handleSuccess(req, res, 'Thanks for contact us, we will get back to you soon.');
                } else {
                    common.handleError(res, res, 'User not found in our system, please login for contact us.');
                }
            }
        }
    }
    catch(err) {
        common.handleError(res, res, 'Something went wrong, please try again.');
    }
});

router.get('/', async (req, res) => {
    const result = await User.find();
    res.send(result);
});

router.get('/about', auth, async (req, res) => {
    res.send('Hello About!');
});

router.get('/contact', async (req, res) => {
    res.send('Hello Contact!');
});

router.get('/login', async (req, res) => {
    res.send('Hello Login!');
});

router.get('/profile', auth, async (req, res) => {
    console.log('Hello Profile!');
    common.handleData(res, res, req.rootUser);
});

router.get('/getUserData', auth, async (req, res) => {
    common.handleData(res, res, req.rootUser);
});

router.get('/logout', auth, async (req, res) => {
    try {
        //forCookie are getting from auth middleware
        req.forCookie.tokens = req.forCookie.tokens.filter((currentElement) => {
            return currentElement.token !== req.token //Return all tokens except current token
        });
        res.clearCookie("jwt", { path: '/' });
        await req.forCookie.save(); // save all tokens again into same document 
        common.handleSuccess(req, res, "Logout successfully.");
    }
    catch(err) {
        common.handleError(err, res, '');
    }
});


router.get('/messages', async (req, res) => {
    /*
    ===================================== Search Machanishm ======================================
    https://stackoverflow.com/questions/26699885/how-can-i-use-a-regex-variable-in-a-query-for-mongodb

    db.users.find(name: new RegExp(search)) //For substring search, case sensitive. 
    db.users.find(name: new RegExp('^' + search + '$')) //For exact search, case sensitive
    db.users.find(name: new RegExp(search， ‘i')) //For substring search, case insensitive
    db.users.find(name: new RegExp('^' +search + '$', 'i')); //For exact search, case insensitive
    ===================================== Search Machanishm ======================================
    */
    try {
        let message = req.body.message;
        const isMessage   = await User.findOne({"messages.message": new RegExp(message, 'i') });
        if(isMessage) {
            common.handleData(req, res, "Message Available");
        } else {
            common.handleError(req, res, 'Message not available, search another message.');
        }
    }
    catch(err) {
        common.handleError(err, res, '');
    }
});

module.exports = router;