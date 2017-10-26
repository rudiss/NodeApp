var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.get("/", function(req, res) {
  res.render("landing");
});
app.use(express.static(__dirname + "/public")); //assets 
// seedDB();

//Index
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new")
});

//Create
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/:id", function(req, res) {
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

//COMMENTS ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if (err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground})
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
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
app.listen(3000, function() {
  console.log('Server running on port:3000.');
});
