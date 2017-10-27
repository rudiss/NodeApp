var express = require("express");
var router  = express.Router();
var Campground =require("../models/campground");


//Index
router.get("/campgrounds", function(req, res) {
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
router.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new")
});

//Create
router.post("/campgrounds", function(req, res) {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampgroud = {
    name: name,
    image: image,
    description: desc
  };
  Campground.create(newCampgroud, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//SHOW
router.get("/campgrounds/:id", function(req, res) {
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
