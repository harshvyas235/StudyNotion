const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
    name:{
        type:String
    },
    discription:{
        type:String
        
    },
    courseDuration:{


    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ,
    whatWillYOuLearn:{
        type:String
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }]
    ,price:{
        type:String
    
    },
    thumbnail: {
		type: String,
	},
    tag:{
        type:[String],
       require:true

    },
    category:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Category"
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId
        , ref:"User"
    }]
    ,
    instructions:{
        type:[String],
    },

    status:{
        type:String,
        enum:["Draft","Published"]
    }



})

module.exports=mongoose.model("Courses",coursesSchema);