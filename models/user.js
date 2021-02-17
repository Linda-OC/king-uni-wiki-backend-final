const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = require('./article');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
            type: String,
            required: true
    },
    articles: [],
    googleId: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;