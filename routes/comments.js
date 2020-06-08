var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campgrounds");
var Comments = require("../models/comment");
var middleware = require("../middleware");  // since our file is named index.js its automatically required when we specify the folder alone


//Comment new
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err)
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
   
})

//comment create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if (err){
            console.log(err);
        }   else {
            var author = req.body.authorComment;
            var text = req.body.author;
            Comments.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    foundCamp.comments.push(comment);
                    foundCamp.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            });

        }
    });
});

//comment edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comments.findById(req.params.comment_id, function(err, foundComment){
        console.log(req.params);
        if (err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
});
    });

//comment update logic
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if (err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });  
});

//comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comments.findByIdAndRemove(req.params.comment_id, function(err, deletd){
        if (err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
    



 
module.exports = router;

