// loads the .env files content into the process of the application
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

// creates an express application
const pfServer = express()

// cors used for starting the data sharing 
pfServer.use(cors())

// for converting json data into js we use json() method of express for parsing since json is the data form in rest api 
pfServer.use(express.json())

// path needs to be set only after the previous 2 steps 
pfServer.use(router)

// set port number of server as 4000 process.env.port is used to select an another port number when 4000 is not avaialble after deployemnt
const PORT = 4000 || process.env.PORT

// 
pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at port: ${PORT} and waiting for client request!!!!`);
})

// http get request resolving to http://localhost:4000/
// browser can display get request only 
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started and waiting for client request.. !!!</h1>`)
})

// http post request 
pfServer.post('/',(req,res)=>{
    res.send("POST Request")
})

// http put request 
pfServer.put('/',(req,res)=>{
    res.send("PUT Request")
})