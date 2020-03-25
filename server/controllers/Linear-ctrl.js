const Methods = require('../models/Linear-model')

createMethod = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const method = new Methods(body)

    if (!method) {
        return res.status(400).json({ success: false, error: err })
    }

    method
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: method._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })
}

getArray = async (req, res) => {
    await Methods.find({}, (err, method) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!method.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: method })
    }).catch(err => console.log(err))
}

module.exports = {
    createMethod,
    getArray,
    
}