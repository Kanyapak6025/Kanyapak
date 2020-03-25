const mongoose = require('mongoose')
const Schema = mongoose.Schema

const method = new Schema(
    {
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('functions', method)