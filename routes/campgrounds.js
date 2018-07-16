  //===================//
 // Campground routes //
//===================//

var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middlewares");

router.get("/",function(req, res) {
	Campground.find({},function(err, cg) {
		if (err) {
			console.log("SOMETHING WENT WRONG");
			console.log(err);
		} else {
			res.render("./campgrounds/index",{cgrounds:cg});
		}
	});
});

//CREATE - Add new campground//
router.post("/", middleware.isLoggedIn, function(req, res) {
	var cg = req.body.campground;
	cg.author = {
		id: req.user._id,
		username: req.user.username
	}
	Campground.create(cg, function(err, cg) {
		if (err) {
			console.log("SOMETHING WENT WRONG.");
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//NEW - Show form to create new campground//
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new")
});

//SHOW - Show detailed info about selected campground//
router.get("/:id",function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err) {
			console.log(err);
			req.flash("error","Sorry, the requested campground does not exist");
			res.redirect("/campgrounds");
		} else {
			if (!campground) {
                    req.flash("error", "Campground not found.");
                    return res.redirect("back");
                }
			res.render("campgrounds/show", {cg:campground});
		}
	});
});

//EDIT - To Edit the campground information
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id).exec(function(err, campground) {
		if (err) {
			console.log(err)
			req.flash("error","Sorry, the requested campground does not exist");
			res.redirect("/campgrounds");
		} else {
			if (!campground) {
                    req.flash("error", "Campground not found.");
                    return res.redirect("back");
                }
			res.render("campgrounds/edit",{cg:campground});
		}
	});
});

//UPDATE - To Update the edited information
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			if (!campground) {
                    req.flash("error", "Campground not found.");
                    return res.redirect("back");
                }
			req.flash("success","Your campground was updated.");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY - To remove the campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id,function(err) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			req.flash("success","Your campground was removed!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;