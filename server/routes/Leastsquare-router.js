const express = require('express')

const FuncCtrl = require('../controllers/Leastsquare-ctrl')

const router = express.Router()

router.post('/Leastsquare', FuncCtrl.createMethod)
router.get('/Leastsquare', FuncCtrl.getLeastsquare)

module.exports = router