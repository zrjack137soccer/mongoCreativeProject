var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
    res.sendStatus(200);
});

router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
var requestname = req.query['q'];
var obj = {};
if(requestname) {
    obj = {Name:requestname};
}

Comment.find(obj,function(err,commentList) { //Calls the find() method on your database
    console.log(commentList); //Otherwise console log the comments you found
    res.json(commentList); //Then send the comments
});
});

router.delete("/comment", function(req,res,next){
    console.log("Deleting");
    Comment.find({}).remove(function(err, commentList){
        if(err) return console.error(err);
        else{
            res.sendStatus(200);
        }
    });
});
module.exports = router;
