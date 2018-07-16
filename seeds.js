var mongoose	= require("mongoose"),
Campground		= require("./models/campgrounds"),
Comment			= require("./models/comments");

var data = [
	{
		name: "Hell's kitchen",
		image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Something something",
		image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Something else",
		image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
]

function seedDB() {
//Remove all campgrounds
	Campground.remove({},function(err) {
// 		if (err) {
// 			console.log(err)
// 		}
// 		console.log("Campgrounds removed");
// //Add a few campgrounds
// 		data.forEach(function(seed) {
// 			Campground.create(seed,function(err, campground) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log("Campground added!");
// //Add a few comments
// 					Comment.create({
// 						text: "This is a great place but it isn't on the internet yet and that really sucks!",
// 						author: "Somebody"
// 					}, function(err,comment) {
// 						if (err) {
// 							console.log(err);
// 						} else {
// 							campground.comments.push(comment);
// 							campground.save();
// 							console.log("Created a new comment!");
// 						}
// 					});
// 				}
// 			});
// 		});
	});
}

module.exports = seedDB;