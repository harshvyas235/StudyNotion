const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({

    gender:{
        type:String,
        // require:true
    },
    dateofbirth:{
        type:String
    },
    contactNumber:{
        type:String

    }


})

module.exports=mongoose.model("Profile",profileSchema);