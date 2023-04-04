const { error } = require("console")
const express = require('express')
const shopControllers = require('../controllers/shop')
const router = express()

router.get('/', shopControllers.getUser)
router.post('/add-product', shopControllers.postUser)
router.delete('/delete/:id', shopControllers.deleteProduct)
module.exports = router