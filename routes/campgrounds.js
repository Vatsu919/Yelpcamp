var express = require("express");
var router = express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index");

router.get("/campgrounds",function(req,res){
	Campground.find({},function(err,campgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds",{campgrounds : campgrounds,currentUser:req.user});
	})
	
});


router.get("/campgrounds/new",middleware.check3,function(req,res){
	res.render("createform");
});

router.post("/campgrounds",middleware.check3,function(req,res){
	var ty=req.body.name;
	var ty1=req.body.image;
	var price=req.body.price;
	var desc=req.body.description;
	
	Campground.create({name:ty,price:price,image:ty1,description:desc},function(err,camp){
	if(err)
		console.log("Error:"+ err);
	else
		camp.author.username=req.user.username;
		camp.author.id=req.user._id;	
		camp.save();
		res.redirect("/campgrounds");
	});
	
});

router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,found){
		if(err)
			console.log(err);
		else
			res.render("show",{campgrounds:found,currentUser:req.user});
	});
	
});

router.get("/campgrounds/:id/edit",middleware.check1,function(req,res){
	
	Campground.findById(req.params.id,function(err,camp){
	res.render("editCampground",{campground:camp});
	});
	
})

router.put("/campgrounds/:id",middleware.check1,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,camp){
		if(err)
			console.log(err);
		else
			{
				res.redirect("/campgrounds/"+req.params.id);
			}
	})
});

router.delete("/campgrounds/:id",middleware.check1,function(req,res){
	Campground.findOneAndDelete(req.params.id,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");
	})
});





module.exports = router;