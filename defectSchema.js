const mongoose = require('mongoose')
const Schema = mongoose.Schema

var defect = new Schema({
    title: String,
    description: String,
    date: { type: Date, required: true, default: Date.now },
    category: {
        name: String,
        code: String
    }
})

const Defect = mongoose.model('defect', defect)

module.exports = Defect