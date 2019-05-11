var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        firstname: String,
        lastname: String
    },
    email: String,
    salt: String,
    description: String,
    Rating: Number,
    location: {
        city: String,
        street: String,
        zipcode: String,
    },
    register_date: Date,
    history: [{}]
});

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});



var User = mongoose.model('User', UserSchema);
module.exports = User;