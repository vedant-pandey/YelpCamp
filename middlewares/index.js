var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id,function(err,campground) {
			if (err) {
				req.flash("error","Campground not found!");
				res.redirect("back");
			} else {
				if (!campground) {
					req.flash("error","Campground does not exist");
					return res.redirect("/campgrounds");
				}
				if (campground.author.id.equals(req.user._id)) {
					next();
				} else{
					req.flash("error","You don't have the permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("/login");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id,function(err,comment) {
			if (err) {
				req.flash("error","Something went wrong!")
				res.redirect("back");
			} else {
				if (!comment) {
					req.flash("error","Comment does not exist");
					return res.redirect("/campgrounds");
				}
				if (comment.author.id.equals(req.user._id)) {
					next()
				} else{
					req.flash("error","You don't have permission to do that.")
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be logged in to do that.");
		res.redirect("/login");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error","You need to be logged in to do that.");
	res.redirect("/login");
}


module.exports = middlewareObj;