const express = require('express')

const router = new express.Router();
const userController = require('../Controllers/userController')

// register API
router.post('/user/register',userController.register)
router.post('/user/login',userController.login)

// to provide the path of the index.js we need to export the router since indes.js is the only file that will run in the server 
module.exports = router