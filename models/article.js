const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 5
    },
    description: {
        type: String,
        required: true,
        min: 20
    },
    author: {
        type: Schema.Types.ObjectId,       
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;