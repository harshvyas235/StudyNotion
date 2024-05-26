const Category= require("../model/category")
exports.createCategory=async(req,res)=>{
    try{
        const {name,discription}= req.body
        if(!name||!discription){
            res.status(500).json({
                success:false,
                message:"plz fill all the details"
            })
        
         
        }
        const categoryDetails = await Category.create({name,discription})
        res.status(200).json({
            success:true,
            message:"category created successfully"
        })

    }catch(err){

       return  res.status(500).json({
                success:false,
                message:"error in creating the tags"
            })

    }
   
}

exports.showallCategories= async(req,res)=>{
    try {
    console.log("ab apn sari categories dekhenge ")
   const alltags = await Category.find({},{name:true,discription:true})
   
   res.status(200).json({
	success:true,
	message:"category get all successfully",
	data:alltags
})
	}
catch(err){

	return  res.status(500).json({
			 success:false,
			 message:"error in fetching the tags"
		 })

 }
}


exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses")
			.exec();
		console.log(selectedCategory);
		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		const selectedCourses = selectedCategory.courses;

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};