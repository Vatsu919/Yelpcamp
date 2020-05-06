var mongoose=require("mongoose");
var Comment=require("./comment");

var campgroundSchema=new mongoose.Schema({name: String,
	image:String,
	price:String,
	description:String,
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	author:{
		username:String,
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
	}
});
module.exports = mongoose.model("Campground",campgroundSchema);
