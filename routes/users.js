var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usersDB', {useNewUrlParser: true});

var userSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Url: String
});

var User = mongoose.model('User', userSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('User Connected');
});

router.post('/users', function(req, res, next){
    console.log("Create user route");
    console.log(req.body);
    var newUser = new User(req.body);
    console.log(newUser);
    newUser.save(function(err, create){
        if (err) return console.error(err);
        console.log(create);
        res.sendStatus(200);
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
