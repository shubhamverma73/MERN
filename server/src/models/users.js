const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

// Schema
const usersSchema = new mongoose.Schema({
    name:   { 
                type: String, 
                required: true,
                minlength: 4
            },
    email:  {
                type: String,
                required: true,
                unique: [true, "Email is already exists"],
            },
    password:  {
                type: String,
                required: true,
            },
    phone:  {
                type: Number,
                min: 10,
                required: true,
                unique: true
            },
    address:{
                type: String,
                required: true
            },
    tokens: [
                { 
                    token: {
                        type: String, 
                        required: true,
                    }                
                }
            ],
    messages:[
                { 
                    name:   { 
                        type: String, 
                        required: true,
                    },
                    email:  {
                        type: String,
                        required: true,
                    },
                    subject:  {
                        type: String,
                        required: true,
                    },
                    message:  {
                        type: String,
                        required: true,
                    }               
                }
            ],
    date:   { 
                type: Date, 
                default: Date.now 
            }
});

// ================== Generate Token =====================
usersSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch(err) {
        common.handleError(err, res, 'Getting error during gerenate token: '+err);
    }
}

// ============== Convert password into hash ======================
usersSchema.pre("save", async function(next) { //Middleware
    if(this.isModified("password")) { //If user only change password, than this function will be call
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// ====================== Save message into row (Documents) ====================
usersSchema.methods.addMessage = async function(name, email, subject, message) {
    try {
        this.messages = this.messages.concat({name, email, subject, message});
        await this.save();
        return this.messages;
    }
    catch(err) {
        common.handleError(err, res, 'Getting error during save message: '+err);
    }
}

// Collection create
const Users = new mongoose.model('Users', usersSchema);

module.exports = Users;