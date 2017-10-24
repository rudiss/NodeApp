var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");

app.get("/", function(req, res){
  res.render("landing");
})
var campgrounds = [
  {name: "Salmom Creek", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" },
  {name: "Salmom Creek2", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" },
  {name: "Salmom Creek3", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" }
]

app.get("/campgrounds", function(req, res){

  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var newCampgroud = {name: name, image:image};
  campgrounds.push(newCampgroud);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new")
})

app.listen(3000, function() {
  console.log('Server running on port:3000.');
})
