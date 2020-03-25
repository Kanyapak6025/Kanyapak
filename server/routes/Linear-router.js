const express = require('express')

const FuncCtrl = require('../controllers/Linear-ctrl')

const router = express.Router()

router.post('/Linear', FuncCtrl.createMethod)
router.get('/Linear', FuncCtrl.getArray)

module.exports = router