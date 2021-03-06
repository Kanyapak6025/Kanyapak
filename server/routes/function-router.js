const express = require('express')

const FuncCtrl = require('../controllers/function-ctrl')
const linearCtrl = require('../controllers/Linear-ctrl')
const diffCtrl = require('../controllers/Diff-ctrl')
const integrateCtrl = require('../controllers/Integrate-ctrl')
const iterativeCtrl = require('../controllers/Iterative-ctrl')
const iterpolationCtrl = require('../controllers/Iterpolation-ctrl')
const leastCtrl = require('../controllers/Leastsquare-ctrl')
const router = express.Router()

router.post('/functions', FuncCtrl.createMethod)
router.get('/functions', FuncCtrl.getMethod)
router.get('/linears', linearCtrl.getArray)
router.get('/diffs', diffCtrl.getDiff)
router.get('/integrates', integrateCtrl.getIntegrate)
router.get('/iteratives', iterativeCtrl.getArrays)
router.get('/iterpolations', iterpolationCtrl.getIterpolation)
router.get('/leastsquares', leastCtrl.getLeastsquare)
module.exports = router