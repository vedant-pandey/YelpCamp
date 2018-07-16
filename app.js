var express					= require("express"),
	app						= express(),
	bodyParser				= require("body-parser"),
	passport				= require("passport"),
	LocalStrategy			= require("passport-local"),
	methodOverride			= require("method-override"),
	mongoose				= require("mongoose"),
	flash					= require("connect-flash"),
	expressSanitizer		= require("express-sanitizer"),
	Campground				= require("./models/campgrounds"),
	Comment					= require("./models/comments"),
	User					= require("./models/users"),
	passportLocalMongoose	= require("passport-local-mongoose"),
	seedDB					= require("./seeds");

var commentRoutes			= require("./routes/comments"),
	campgroundRoutes		= require("./routes/campgrounds"),
	indexRoutes				= require("./routes/index");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////
 // Connections //
/////////////////

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /////////////////////////////
  // Passport Configurations //
 /////////////////////////////

 app.use(require("express-session")({
 	secret: "Alakazaam!",
 	resave: false,
 	saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
// seedDB();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////
 // Routes //
////////////


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////
 // Listener //
//////////////

app.listen(7263, function() {
	console.log("SERVER 7263 ONLINE");
});