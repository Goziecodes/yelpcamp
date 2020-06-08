var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var middleware = require("../middleware");  // since our file is named index.js its automatically required when we specify the folder alone



//root route
router.get("/", function(req, res){
    res.render("landing");
});





//show register form
router.get("/register/", function(req, res){
    res.render("register");
});

//handle signuplogic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.redirect("/register");
        }   else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds"); 
            });
        }
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){    
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});



module.exports = router;