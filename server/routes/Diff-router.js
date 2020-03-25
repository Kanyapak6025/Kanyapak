const express = require('express')

const FuncCtrl = require('../controllers/Diff-ctrl')

const router = express.Router()

router.post('/diffs', FuncCtrl.createMethod)
router.get('/diffs', FuncCtrl.getDiff)

module.exports = router