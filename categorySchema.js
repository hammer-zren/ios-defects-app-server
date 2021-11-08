const mongoose = require('mongoose')
const Schema = mongoose.Schema

var category = new Schema({
    name: String,
    code: String,
    description: String
})

const Category = mongoose.model('category', category)

module.exports = Category