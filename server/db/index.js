
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://dbadmin:Kanyapak6025@numerdbms-yqijv.mongodb.net/function', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db