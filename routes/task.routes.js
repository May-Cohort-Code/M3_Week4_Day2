const Project = require("../models/Project.models");
const Task = require("../models/Task.models");

const router = require("express").Router();


router.post('/tasks', async (req,res)=>{
    const {title, description,projectId} = req.body

    try{
        const createdTask = await Task.create({title,description,project:projectId})

        const updatedProject = await Project.findByIdAndUpdate(projectId,{$push:{tasks:createdTask._id}})

        res.json({updatedProject,createdTask})


    }
    catch(err){
        res.json(err)
    }
})



    router.post('/tasks',(req,res)=>{
        const {title, description,projectId} = req.body

        Task.create({title,description,project:projectId})
        .then((createdTask)=>{
            return Project.findByIdAndUpdate(projectId,{$push:{tasks:createdTask._id}})
        })
        .then((updatedProject)=>{
            res.json(updatedProject)
        })
    })


module.exports = router;
