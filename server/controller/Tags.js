const tag = require("../model/tags")

exports.createTag= async(req,res)=>{
    try{
        const {name, description}= req.body

        if(!name && !description){
            return res.status(404).json({
    error:"enter all the detail"
    
            })
        }

        const newTag= await tag.create({name:name,description:description},{new:true})


        return res.status(200).json({
            succes:true,
            message:"Tag create",
            data :newTag
        })

    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
            succes:false,
            message:err.message
        })

    }
}