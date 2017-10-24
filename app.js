var express = require("express");
var app = express();

app.set("view engine" , "ejs");

app.get("/", function(req, res){
  res.render("landing");
})


app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Salmom Creek", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" },
    {name: "Salmom Creek2", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" },
    {name: "Salmom Creek3", image: "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg" }
  ]
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, function() {
  console.log('Server running on port:3000.');
})
