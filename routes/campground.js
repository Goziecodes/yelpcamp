var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");  // since our file is named index.js its automatically required when we specify the folder alone




//index - show all campgrounds
router.get("/", function(req,res){
    Campground.find({}, function(err, allcamps){
        if(err){
            console.log(err)
        } else {
             // used to pass the value of camps to the campgrounds page being rendred
    res.render("campgrounds/index", {camps: allcamps});
        }
    });
   
});

//new - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//create - add new campgrnd to db
router.post("/", middleware.isLoggedIn, function(req,res){
   var name =  req.body.name; //req.body through parser is used to refer to data from form ...refer to documentation.md
   var img = "/images/" + req.body.image; //to conform with the image location in public like the rest in campground array
   var descr = req.body.desc;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCamp = {name: name, img: img, description: descr, author: author} //create an object from retrieved data from form to b pushed to array
   Campground.create(newCamp, function(err, newlyCreated){
       if(err){
           console.log(err)
       } else {
        res.redirect("/campgrounds");
           console.log(newlyCreated);
       }
   });
   });

//show - shows more info abt one campgrnd
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log(err)
        } else {
            // console.log(foundcamp);
            res.render("campgrounds/show", {campground: foundcamp})
        }
    });
});

// Edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){ //
    Campground.findById(req.params.id, function(err, foundCampground){          
        res.render("campgrounds/edit", {campground: foundCampground});        
    });    
});

//update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    var name =  req.body.name; //req.body through parser is used to refer to data from form ...refer to documentation.md
   var img = "/images/" + req.body.image; //to conform with the image location in public like the rest in campground array
   var descr = req.body.desc;
   var newCamp = {name: name, img: img, description: descr} ;
    Campground.findByIdAndUpdate(req.params.id, newCamp, function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        }   else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndDelete(req.params.id, function(err){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;