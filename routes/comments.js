var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); //index.js special name
var router = express.Router({
  mergeParams: true
}); //mergeParams to get campground id


//COMMENTS ROUTES
router.get("/new", middleware.isLoggedIN, function(req, res) {
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

router.post("/", middleware.isLoggedIN, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Comment posted!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//Comment Edit Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment
      });
    }
  })
});

//Comment UPDATE Route
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted.")
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})


module.exports = router;
