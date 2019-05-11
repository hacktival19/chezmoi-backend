var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var FoodEventSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        lowercase: true
    },
    host: UserSchema,
    capacity: Number,
    title: String,
    description: String,
    Rating: Number,
    location: {
        city: String,
        street: String,
        zipcode: String,
    },
    register_date: Date,
    startingTime: Date,
    pricing: String,
    status: String,
    foodTags: [],
    clients: []
});

FoodEventSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});



var FoodEvent = mongoose.model('FoodEvent', FoodEventSchema);
module.exports = FoodEvent;