var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [{
    name: "Space Image One",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1352&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "Etiam in tortor placerat nulla tempus lacinia nec at arcu. Quisque id erat ultricies ligula ullamcorper fermentum. Pellentesque purus neque, convallis non volutpat et, viverra in velit. Phasellus sit amet justo vestibulum, laoreet velit vel, imperdiet nunc. In quam nunc, feugiat at venenatis quis, egestas tempor libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam nisi ex, condimentum eget ipsum at, tempor malesuada ex. Proin id mollis urna, ac porta nibh. Quisque id leo vel sapien mollis luctus a vel eros."
  },
  {
    name: "Space Image Two",
    image: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=733&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "Etiam in tortor placerat nulla tempus lacinia nec at arcu. Quisque id erat ultricies ligula ullamcorper fermentum. Pellentesque purus neque, convallis non volutpat et, viverra in velit. Phasellus sit amet justo vestibulum, laoreet velit vel, imperdiet nunc. In quam nunc, feugiat at venenatis quis, egestas tempor libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam nisi ex, condimentum eget ipsum at, tempor malesuada ex. Proin id mollis urna, ac porta nibh. Quisque id leo vel sapien mollis luctus a vel eros."
  },
  {
    name: "Space Image Three",
    image: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    description: "Etiam in tortor placerat nulla tempus lacinia nec at arcu. Quisque id erat ultricies ligula ullamcorper fermentum. Pellentesque purus neque, convallis non volutpat et, viverra in velit. Phasellus sit amet justo vestibulum, laoreet velit vel, imperdiet nunc. In quam nunc, feugiat at venenatis quis, egestas tempor libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam nisi ex, condimentum eget ipsum at, tempor malesuada ex. Proin id mollis urna, ac porta nibh. Quisque id leo vel sapien mollis luctus a vel eros."
  }
]

function seedDB() {
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("remove camps!");
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          Comment.create({
            text: "Nice Space pictures! Woot!",
            author: 'Mark'
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created comment");
            }
          });
        }
      })
    })
  });

}
module.exports = seedDB;
