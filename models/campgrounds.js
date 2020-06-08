var mongoose = require("mongoose");
//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    comments: [
        {
            type:   mongoose.Schema.Types.ObjectId,
            ref:    "Comments"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
