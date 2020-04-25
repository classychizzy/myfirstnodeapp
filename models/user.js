let mongoose = require('mongoose');
let UniqueValidator = require('mongoose-unique-validator');//this line adds a unique validator to email 
//and username
let crypto = require('crypto'); // a method is created here for the user model to hash passwords
// require jwt and the application secret
let jwt = require('jsonwebtoken');
let secret = require('../config').secret

/* organising the data for users with validation*/
let UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    bio: String,
    image: String,
    hash: String,
    salt: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
// the line below creates a method for user schema*/
UserSchema.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };
    // method for validating user passwords
    UserSchema.methods.validPassword = function(password) {
         let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
         return this.hash === hash;
        };

mongoose.model('User', UserSchema);
