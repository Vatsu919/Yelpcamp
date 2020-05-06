
var express = require("express");
var router = express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware/index");

router.get("/campgrounds/:id/comment/new", middleware.check3 ,function(req,res){
	var id=req.params.id;
	res.render("createComment",{id:id});
});

router.post("/campgrounds/:id/comment",middleware.check3,function(req,res){
	
	Comment.create(req.body.comment,function(err,comment){
		if(err)
			console.log(err);
		
		comment.author.id=req.user._id;
		comment.author.username=req.user.username;
		comment.save();
		Campground.findById(req.params.id,function(err,camp){
			if(err)
				console.log(err);
			camp.comments.push(comment);
			camp.save();
		});
	});
	
	
	res.redirect("/campgrounds/"+req.params.id);
});
router.get("/campgrounds/:id/comment/:cid/edit",middleware.check2,function(req,res){
	Comment.findById(req.params.cid,function(err,comment){
		if(err)
			console.log(err);
		else{
			res.render("editComment",{comment:comment,id:req.params.id});
		}
	});
});

router.put("/campgrounds/:id/comment/:cid",middleware.check2,function(req,res){
	Comment.findByIdAndUpdate(req.params.cid,req.body.comment,function(err,comment){
		if(err)
			console.log(err);
		else
			{
				res.redirect("/campgrounds/"+req.params.id);
			}
	});
});


router.delete("/campgrounds/:id/comment/:cid",middleware.check2,function(req,res){
	Comment.findByIdAndDelete(req.params.cid,function(err){
		if(err)
			console.log(err);
		else
			{
				req.flash("success","comment deleted");
				res.redirect("/campgrounds/"+req.params.id);
			}
	})
})




module.exports = router;