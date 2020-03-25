const express = require('express')

const FuncCtrl = require('../controllers/Integrate-ctrl')

const router = express.Router()

router.post('/Integrate', FuncCtrl.createMethod)
router.get('/Integrate', FuncCtrl.getIntegrate)

module.exports = router