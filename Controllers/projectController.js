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