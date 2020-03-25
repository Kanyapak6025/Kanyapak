const express = require('express')

const FuncCtrl = require('../controllers/Iterpolation-ctrl')

const router = express.Router()

router.post('/Iterpolation', FuncCtrl.createMethod)
router.get('/Iterpolation', FuncCtrl.getIterpolation)

module.exports = router