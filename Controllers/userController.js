const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//  register
exports.register = async (req,res)=>{
    console.log('Inside Register Controller function ')
    // res.status(200).json("Register Request Received")
    const {username,email,password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exists !!! Please Login")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Failed, Error: ${err}`)
    }
}

//  login
exports.login = async (req,res)=>{
    console.log('Inside Login Controller function ')
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"secret1998")
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(404).json(`Incorrect Email / Password`)
        }
        
    }
    catch(err){
        res.status(401).json(`Login API Failed, Error: ${err}`)
    }
}

// edit user 
exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,profile,github,linkedin} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)

    }
    
}