var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //index.js special name

//Index
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });
});

//NEW
router.get("/new", middleware.isLoggedIN, function(req, res) {
  res.render("campgrounds/new")
});

//Create
router.post("/", middleware.isLoggedIN, function(req, res) {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampgroud = {
    name: name,
    image: image,
    description: desc,
    author: author
  };

  Campground.create(newCampgroud, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  //equals com from Mongoose
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {
      campground: foundCampground
    });
  });
});

//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res) {
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // redirect somewhere(show page)
});

//DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res) {
  //Using Mongoose
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});


//SHOW
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
});

module.exports = router;
