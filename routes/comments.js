var express = require("express");
var router  = express.Router();
var Campground =require("../models/campground");
var Comment =require("../models/comment");


function isLoggedIN(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
//COMMENTS ROUTES
router.get("/campgrounds/:id/comments/new",isLoggedIN, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground
      })
    }
  });
});

router.post("/campgrounds/:id/comments", isLoggedIN, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
})

module.exports = router;
