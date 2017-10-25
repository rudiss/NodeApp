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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
//
// Campground.create({
//   name: "Salmom Creek",
//   image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg"
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
          res.render("campgrounds", {campgrounds: campgrounds});
        }
      })
});

//Create
app.post("/campgrounds", function(req, res) {
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var newCampgroud = {
    name: name,
    image: image
  };
  Campground.create(newCampgroud, function(err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new")
})

app.listen(3000, function() {
  console.log('Server running on port:3000.');
})
