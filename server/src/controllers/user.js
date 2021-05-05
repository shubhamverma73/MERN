const dotenv    = require('dotenv');
const express   = require('express');
const path      = require('path');
const app       = express();
const envpath   = path.join(__dirname, "../../src/");
dotenv.config({path: envpath + 'config.env'});
require('./../db/conn');
const port      = process.env.PORT;

// =================================== Middleware use by our system ===========================================
app.use(express.json());
app.use(require('./../routers/user'));

app.listen(port, () => {
    console.log('connected to server: '+ port);
});