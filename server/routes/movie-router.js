const express = require('express')

const FuncCtrl = require('../controllers/function-ctrl')

const router = express.Router()

router.post('/function', FuncCtrl.createMethod)
router.get('/function/:id', FuncCtrl.getMethodById)
router.get('/function', FuncCtrl.getMethod)

module.exports = router