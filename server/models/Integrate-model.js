const mongoose = require('mongoose')
const Schema = mongoose.Schema

const method = new Schema(
    {
        n: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Integrate', method)