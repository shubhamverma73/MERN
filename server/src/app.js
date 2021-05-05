const dotenv    = require('dotenv');
const express   = require('express');
const cookieParser = require('cookie-parser');
const app       = express();
dotenv.config({path: './config.env'});
require('./db/conn');
const port      = process.env.PORT;

// =================================== Middleware use by our system ===========================================
app.use(express.json());
app.use(cookieParser());
app.use(require('./routers/user'));

app.listen(port, () => {
    console.log('connected to server');
});