const { isAuthenticated } = require("../middleware/jwt.middleware");
const Project = require("../models/Project.models");

const router = require("express").Router();

const fileUploader = require('../config/cloudinary.config')



//POST


router.post('/projects',isAuthenticated,(req,res)=>{
    const {title,description,imageUrl} = req.body

    if(!title || !description){
        res.json({message:"Please fill in all mandetory Fields"})
        return
    }

    Project.create({title:title,description:description,image:imageUrl})
    .then((newProject)=>{
        res.json({message:"Project Successfully Created"})
    })
    .catch((err)=>{
        res.json(err)
    })
})

//GET
router.get('/projects',isAuthenticated,(req,res)=>{

    Project.find()
    .populate('tasks')
    .then((allProjects)=>{
        res.json(allProjects)
    
    })
    .catch((err)=>{
        res.json(err)
    })

})



//find()
//findByIdAndUpdate()
//findByIdAndDelete()
//


//upload
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });
  


//GET for 1 project


router.get('/projects/:id',(req,res)=>{
    const {id} = req.params

    Project.findById(id)
    .populate('tasks')
    .then((oneProject)=>{
        res.json(oneProject)
    })
    .catch((err)=>{
        res.json(err)
    })

})


//PUT

//Find a project based on an id 
//and then should change it based on what the user provides

router.put('/projects/:id',(req,res)=>{
    const {id} = req.params
    const {title,description} = req.body
    
    Project.findByIdAndUpdate(id,{title,description},{new:true})
    .then((updatedProject)=>{
        res.json(updatedProject)
    })
    .catch(err=>{
        res.json(err)
    })

})




//DELETE
//create a route for deleting
// once a request is sent the document with the id in the params should be deleted from our Database
// send back as a response {message: "project deleted"}

router.delete('/projects/:id',(req,res)=>{
    
    Project.findByIdAndDelete(req.params.id)
    .then((deletedProject)=>{
        if(!deletedProject){
            res.json({message:"Project Not Found"})
            return
        }
        res.json({message:"project deleted"})
    })
    .catch((err)=>{
        res.json(err)
    })

})




module.exports = router;