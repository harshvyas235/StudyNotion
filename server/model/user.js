const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

firstname:{
    type:String,
    require:true,
    trim: true
},

lastname:{
    type:String,
    require:true,
    trim: true

},
password:{
    type:String,
    require:true,
    trim: true
},
email:{
    type:String,
    require:true,
    trim: true
},
courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
    require:true
}],
additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
    require:true
},
coursesProgress:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"CourseProgress",

}],
image:{
    type:String
    ,
    require:true
},
token:{
    type:String
},
resetPasswordExpires:{
type:String
},

accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    require:true
}

})

module.exports=mongoose.model("User",userSchema);