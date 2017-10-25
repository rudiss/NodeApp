var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {
  useMongoClient: true
});
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
//   name: "Salmom Creek",
//   image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg",
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// }, function(err, campground) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND");
//     console.log(campground);
//   }
// });

app.get("/", function(req, res) {
  res.render("landing");
})

//Index
app.get("/campgrounds", function(req, res) {
      Campground.find({}, function(err, campgrounds) {
        if (err) {
          console.log(err);
        } else {
          res.render("index", {campgrounds: campgrounds});
        }
      })
});

//NEW
app.get("/campgrounds/new", function(req, res) {
  res.render("new")
})

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
  })
});

//SHOW
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  })
})

app.listen(3000, function() {
  console.log('Server running on port:3000.');
})
