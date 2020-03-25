const express = require('express')

const FuncCtrl = require('../controllers/Iterative-ctrl')

const router = express.Router()

router.post('/Iterative', FuncCtrl.createMethod)
router.get('/Iterative', FuncCtrl.getArrays)

module.exports = router