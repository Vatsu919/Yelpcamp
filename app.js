var express = require("express"),
	app = express(),
	bp=require("body-parser"),
	mongoose=require("mongoose"),
	Campground=require("./models/campground"),
	seedDB=require("./seeds"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	User=require("./models/user"),
	flash=require("connect-flash"),	
	Comment=require("./models/comment"),
	methodOverride=require("method-override");
	
	
var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	authRoutes=require("./routes/auth");

//seedDB();
mongoose.connect("mongodb://127.0.0.1:27017/Yelpcamp",{useNewUrlParser:true ,useUnifiedTopology: true } );
app.set("view engine","ejs");
app.use(bp.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
	secret:"fuck the world",
	resave:false,
	saveUninitialized:false
}));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/*Campground.create({
	name:"Somewhere",
	image:"https://images.unsplash.com/photo-1587063299203-df4831fea510?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
	description:"Somewhere is an awesome place to visit and for camping.You will be totally fucked up after visiting!!!!"
	},function(err,camp){
	if(err)
		console.log("Error:"+ err);
	else
		console.log(camp);
});*/

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);














app.listen(process.env.PORT,function(){
	console.log("Yelpcamp is running");
});