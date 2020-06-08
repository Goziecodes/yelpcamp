 var mongoose = require("mongoose");
 var Campground = require("./models/campgrounds");
 var Comments = require("./models/comment");

 var data = [
    {
        name: "monkey",
        img: "/images/photo-1475564481606-0f9f5d97c047.jpeg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, recusandae ab accusamus corporis nesciunt totam architecto nihil perferendis, excepturi ipsa sunt voluptas sequi ipsam minima non, quam culpa quis. Iste."
    },
    {
        name: "monkey",
        img: "/images/photo-1475564481606-0f9f5d97c047.jpeg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, recusandae ab accusamus corporis nesciunt totam architecto nihil perferendis, excepturi ipsa sunt voluptas sequi ipsam minima non, quam culpa quis. Iste."
    },
    {
        name: "monkey",
        img: "/images/photo-1475564481606-0f9f5d97c047.jpeg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, recusandae ab accusamus corporis nesciunt totam architecto nihil perferendis, excepturi ipsa sunt voluptas sequi ipsam minima non, quam culpa quis. Iste."
    }
 ]


 function seedDB() {
     //remove all camps
     Campground.remove({}, function (err) {
         if (err) {
             console.log(err);
         } else {
             console.log("wiped ca,pgrounds!!!");
             //add a few camps
            //  data.forEach(function (seed) {
            //      Campground.create(seed, function (err, campground) {
            //          if (err) {
            //              console.log(err)
            //          } else {
            //              console.log("added a camp");
            //              //create a comment
            //              Comments.create({
            //                  text: "this place is awesome",
            //                  author: "homer"
            //              }, function (err, comment) {
            //                  if (err) {
            //                      console.log(err)
            //                  } else {
            //                      campground.comments.push(comment);
            //                      campground.save();
            //                      console.log("created new comment");
            //                  }
            //              })
            //          }
            //      })
            //  })
         }
     });



 }

 module.exports = seedDB;
