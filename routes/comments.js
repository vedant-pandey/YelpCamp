  //================//
 // Comment routes //
//================//

var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middlewares");

//INDEX
router.get("/",function(req, res) {
	res.redirect("/campgrounds/"+req.params.id);
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err,campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new",{campground: campground})
		}
	});
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req,res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			redirect("/campgrounds")
		} else {
			Comment.create(req.body.comment,function(err,comment) {
				if (err) {
					req.flash("error","Something went wrong!");
					console.log(err);
				} else {
					comment.text = req.sanitize(comment.text);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Your comment was added.");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id,function(err,comment) {
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit",{campground_id: req.params.id, comment:comment});
		}
	});
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id,function(err) {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success","Your comment was removed!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;