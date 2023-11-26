const projects = require('../Models/projectSchema')

// add project
exports.addProjects = async(req,res)=>{
    console.log(("Inside add project function"));
    const userId = req.payload;
    // console.log(`${userId}`);
    const projectImage = req.file.filename
    // console.log(projectImage);
    const {title,languages,overview,github,website} = req.body
    // console.log(`${title},${languages},${overview},${github},${website},${projectImage},${userId}`);

    try{
        const exisitingProject = await projects.findOne({github})
        if(exisitingProject){
            res.status(406).json("Project already exists !!! Please Login")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json(`Request Failed, Error: ${err}`)
    }
}

// getuserprojects - token required
exports.allUserProjects = async(req,res)=>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// getallprojects - token required
exports.getallProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey , $options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// gethomeprojects
exports.getHomeProjects = async(req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit project
exports.editProject = async (req,res)=>{
    // get project id
    const {id} = req.params;
    const {userId} = req.payload;
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage
    try{
        const updateProject = await projects.findByIdAndUpdate({"_id":id},{title,languages,overview,
        github,website,projectImage:uploadProjectImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }

}