const mongoose = require("mongoose")

const CourseProgresschema = new mongoose.Schema({

courseId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Courses"

},
completeVideo:{
type:mongoose.Schema.Types.ObjectId,
ref:"Subsection"
}

})

module.exports=mongoose.model("CourseProgess",CourseProgresschema);