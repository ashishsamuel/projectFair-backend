const express = require('express')

const router = new express.Router();
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');

// register API
router.post('/user/register',userController.register)
// login API
router.post('/user/login',userController.login)
// add-project 
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// to provide the path of the index.js we need to export the router since indes.js is the only file that will run in the server 
module.exports = router