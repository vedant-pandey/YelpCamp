var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users")

//ROOT//
router.get("/", function(req, res) {
	res.render("home");
});

  //=======================//
 // Authentication Routes //
//=======================//

//SHOW - show register form
router.get("/register", function(req, res) {
	res.render("register");
});

//Handle sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user) {
		if(err){
			req.flash("error", err.message);
			res.redirect("back");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success","Welcome to YelpCamp "+user.username);
			res.redirect("/campgrounds");
		});
	});
});

//SHOW - show login form
router.get("/login",function(req, res) {
	res.render("login");
});

// Handle login logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true
	}),function(req,res) {});

//LOGOUT route
router.get('/logout',function(req, res) {
	req.logout();
	req.flash("success","You were logged out!")
	res.redirect("/campgrounds");
});


module.exports = router;