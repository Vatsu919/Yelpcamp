var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {
	check1 : function(req,res,next){
	if(req.isAuthenticated())
	{
	Campground.findById(req.params.id,function(err,camp){
		if(err)
			res.redirect("back");
		else
		{
			if(camp.author.id.equals(req.user._id))
			{
				return next();
			}
			else
			{
				req.flash("error","You do not have permissions to do that");	
				res.redirect("back");
			}
		}
	});
	}
	else
	{
		req.flash("error","You need to be logged in")
		res.redirect("back");
	}
},
	
	check2 : function(req,res,next){
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.cid,function(err,comment){
			if(err)
				console.log(err);
			else
			{
				if(comment.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					req.flash("error","You do not have permissions to do that");
					res.redirect("back");
					
				}
			}
		});
		
		
	}
	else
	{
		req.flash("error","You need to log in");
		res.redirect("back");
	}
		
},
	
	check3 : function(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	req.flash("error","Please login first");
	res.redirect("/login");
}
	
};







module.exports = middlewareObj;